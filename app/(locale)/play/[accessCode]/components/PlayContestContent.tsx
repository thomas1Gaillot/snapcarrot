import {TypographyP, TypographySmall} from "@/components/ui/typography";
import {CameraIcon} from "lucide-react";

import useContestStore from "@/domain/contest/useContestStore";
import useUserStore from "@/domain/user/useUserStore";
import {Theme} from "@/domain/theme/Theme";
import {useStoredPhotos} from "@/domain/photo/use-stored-photos";
import {usePhotoPreviews} from "@/domain/photo/use-photo-preview";
import {useUploadPhoto} from "@/domain/photo/use-upload-photo";

export default function PlayContestContent() {
    const {themes, id} = useContestStore();
    const selectedThemes: Theme[] = themes?.filter(theme => theme.selected) || [];
    const {user} = useUserStore();
    const {storedPhotos, setStoredPhotos} = useStoredPhotos(selectedThemes);
    const {previews, setPreview} = usePhotoPreviews();

    const {uploadPhoto, uploading} = useUploadPhoto({
        userId: user?.id!,
        contestId: id!,
        setStoredPhotos
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, themeId: string) => {
        const selectedFile = e.target.files?.[0] || null;
        setPreview(themeId, selectedFile);
        uploadPhoto(selectedThemes.find(theme => theme?.id === themeId)!, selectedFile!);
    };

    const getStoredPhotoForTheme = (themeId: string) => {
        return storedPhotos.find(photo => photo.themeId === parseInt(themeId));
    };


    return (
        <>
            <div className={"grid gap-1"}>
                <TypographyP>{"Pour chaque thème, chargez une photo qui correspond le mieux au thème."}</TypographyP>
                <TypographySmall>
                    <>Vous avez participé à {storedPhotos.length} des {selectedThemes?.length} photos.</>
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
                            className="relative bg-secondary/50 hover:bg-secondary/80 flex flex-col justify-center items-center gap-4 aspect-[3/4] rounded"
                        >
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, theme.id!)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                key={`${theme.name}-${index}`}
                            />
                            {previews[theme.id!] ? (
                                <img src={previews[theme.id!] || undefined} alt="Preview"
                                     className="object-cover w-full h-full rounded"/>
                            ) : getStoredPhotoForTheme(theme.id!) ? (
                                <img src={getStoredPhotoForTheme(theme.id!)?.url} alt="Stored Preview"
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
