import {TypographyP, TypographySmall} from "@/components/ui/typography";
import {CameraIcon} from "lucide-react";
import useContestStore from "@/domain/contest/useContestStore";
import {useEffect, useState} from "react";
import axios from "axios";
import useUserStore from "@/domain/user/useUserStore";
import {Theme} from "@/domain/theme/Theme";
import {Button} from "@/components/ui/button";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3client";
import {Photo} from "@/domain/photo/Photo";


export default function PlayContestContent() {
    const {themes, id} = useContestStore()
    const selectedThemes = themes?.filter(theme => theme.selected)
    const {user} = useUserStore()
    const [files, setFiles] = useState({});
    const [previews, setPreviews] = useState({})
    const [storedPhotos, setStoredPhotos] = useState<{ [key: number]: Photo | null }>({});

    useEffect(() => {
        if (user && id) {
            fetchStoredPhotos();
        }
    }, [user, id]);

    const fetchStoredPhotos = async () => {
        try {
            if (!selectedThemes) return;
            const photosData = await Promise.all(
                selectedThemes.map(async (theme) => {
                    const response = await axios.get(`/api/photo/${user.id}/${id}/${theme.id}/list`);
                    if (response.data) {
                        return {
                            themeId: theme.id,
                            photo: response.data,
                        };
                    }
                    return {themeId: theme.id, photo: null};
                })
            );

            const photosMap = photosData.reduce((acc, {themeId, photo}) => {
                acc[themeId] = photo;
                return acc;
            }, {});

            setStoredPhotos(photosMap);
        } catch (error) {
            console.error("Error fetching stored photos:", error);
        }
    };

    const handleFileChange = (e, themeId) => {
        const selectedFile = e.target.files[0];
        setFiles((prevFiles) => ({...prevFiles, [themeId]: selectedFile}));
        if (selectedFile) {
            setPreviews((prevPreviews) => ({
                ...prevPreviews,
                [themeId]: URL.createObjectURL(selectedFile),
            }));
        }
    };

    const storeImages = async () => {
        selectedThemes?.map(async (theme: Theme) => {
            const file = files[theme.id];
            if (!file) {
                alert(`Veuillez sélectionner un fichier pour le thème ${theme.name}`);
                return;
            }
            if (!user?.id) {
                alert("Veuillez vous connecter pour participer");
                return;
            }
            if (!id) {
                alert("Concours non trouvé");
                return;
            }
            if (!theme.id) {
                alert("Thème non trouvé");
                return;
            }

            try {
                const filePath = `photos/${Date.now()}_${file.name}`;
                const command = new PutObjectCommand({
                    Bucket: process.env.NEXT_PUBLIC_SUPABASE_S3_NAME,
                    Key: filePath,
                    Body: file,
                    ACL: "public-read",
                });
                const data = await s3Client.send(command);

                // URL de l'image téléchargée
                const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_S3_NAME}/${filePath}`;

                // Mettre à jour la base de données
                await axios.post("/api/photo/add", {
                    url,
                    themeId: theme.id,
                    contestId: id,
                    userId: user.id,
                });

                alert(`File for theme ${theme.name} uploaded successfully`);

                // Mettre à jour les prévisualisations stockées
                setStoredPhotos((prevPhotos) => ({
                    ...prevPhotos,
                    [theme.id]: {id: data.Key, url, themeId: theme.id, userId: user.id, contestId: id},
                }));
            } catch (error) {
                console.error("Error uploading file:", error);
                alert(`Error uploading file for theme ${theme.name}`);
            }
        });
    };

    return (
        <>
            <Button className={"w-full rounded"} onClick={storeImages} variant={"secondary"}>
                Sauvegarder les images
            </Button>
            <div className={"grid gap-1"}>
                <TypographyP>{"Pour chaque thème, chargez une photo qui correspond le mieux au thème."}</TypographyP>
                <TypographySmall>
                    <>Vous avez participé à 0 des {selectedThemes?.length} photos.</>
                </TypographySmall>
            </div>
            <div className="grid w-full gap-8 py-4">
                {selectedThemes?.map((theme, index) => (
                    <div key={index} className={"grid gap-1"}>
                        <div className={"flex items-center gap-1"}>
                            {theme.icon.jsx && (
                                <theme.icon.jsx className={"text-secondary-foreground/80 size-5"}/>
                            )}
                            <p className={"text-xs truncate text-secondary-foreground/80"}>{theme.name}</p>
                        </div>
                        <div
                            className="relative bg-secondary/50 hover:bg-secondary/80 flex flex-col justify-center items-center gap-4 aspect-[3/4] p-2 rounded"
                        >
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, theme.id)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                key={`${theme.name}-${index}`}
                            />
                            {previews[theme.id] ? (
                                <img src={previews[theme.id]} alt="Preview"
                                     className="object-cover w-full h-full rounded"/>
                            ) : storedPhotos[theme.id] ? (
                                <img src={storedPhotos[theme.id]?.url} alt="Stored Preview"
                                     className="object-cover w-full h-full rounded"/>
                            ) : (
                                <CameraIcon className="text-secondary-foreground/50 size-8"/>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
