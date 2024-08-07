import React, {useCallback, useRef} from "react";
import {TypographyH4, TypographyP} from "@/components/ui/typography";
import {CameraIcon, ImagePlusIcon} from "lucide-react";
import useUserStore from "@/domain/user/useUserStore";
import {Theme} from "@/domain/theme/Theme";
import {fetchStoredPhotos} from "@/domain/photo/fetch-stored-photos";
import {usePhotoPreviews} from "@/domain/photo/use-photo-preview";
import {uploadPhoto} from "@/domain/photo/upload-photo";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import LoadingComponent from "@/components/[locale]/loading-component";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchThemes} from "@/domain/contest/fetch-themes";
import {useParams} from "next/navigation";
import VotesProgress from "@/app/(locale)/play/[accessCode]/components/votes-progress";

export default function PlayContestContent({id}: { id: string }) {
    const {user} = useUserStore();

    const params = useParams();
    const accessCode = params ? params.accessCode : null;

    const {data: themes} = useQuery({
        queryKey: ['contest', accessCode, "themes"],
        enabled: !!id,
        queryFn: () => fetchThemes(id),
    });
    const selectedThemes: Theme[] = themes?.filter(theme => theme.selected) || [];
    const {data: storedPhotos = [], isLoading: photosLoading} = useQuery({
        queryKey:  ['contest', accessCode, "stored-photos", selectedThemes.map(theme => theme.id)],
        queryFn: () => fetchStoredPhotos(user, id, selectedThemes),
        enabled: !!user && !!id && selectedThemes.length > 0,
    });
    const {previews, setPreview} = usePhotoPreviews();
    const queryClient = useQueryClient()
    const uploadPhotoMutation = useMutation({
        mutationKey : ["uploadPhotoMutation"],
        mutationFn: ({theme, file}: { theme: Theme, file: File }) => uploadPhoto({
            userId: user?.id!,
            contestId: id!,
            theme,
            file
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["contest", accessCode],
            })
        }
    })

    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const setFileInputRef = useCallback((el: HTMLInputElement | null, index: number) => {
        fileInputRefs.current[index] = el;
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, themeId: string) => {
        const selectedFile = e.target.files?.[0] || null;
        setPreview(themeId, selectedFile);
        uploadPhotoMutation.mutate({
            theme: selectedThemes.find(theme => theme?.id === themeId)!,
            file: selectedFile!
        });
    };

    const getStoredPhotoForTheme = (themeId: string) => {
        return storedPhotos.find(photo => photo.themeId === parseInt(themeId));
    };

    const handleButtonClick = (index: number) => {
        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index]!.click();
        }
    };

    return (
        <>
            <div className={"grid gap-1"}>
                <TypographyH4>Phase de publication</TypographyH4>
                <TypographyP>{'Pour participer, téléchargez une photo par thème !'}</TypographyP>
                <VotesProgress totalVotes={selectedThemes?.length} numberOfVotes={storedPhotos.length}
                               loading={photosLoading}/>
            </div>
            <div className="grid w-full gap-8 py-4">
                {selectedThemes?.map((theme, index) => (
                    <div key={index} className={"grid gap-1 w-full"}>
                        <div className={"flex w-full justify-between"}>
                            <div className={"flex items-center gap-1"}>
                                {theme.icon.jsx && (
                                    <div className={"p-1 rounded-full bg-primary/5  border-2 border-primary"}>
                                        <theme.icon.jsx className={"text-primary size-5"}/>
                                    </div>
                                )}
                                <p className={"text-xs truncate font-medium text-secondary-foreground"}>{theme.name}</p>
                            </div>
                            <Button variant={'ghost'} size={'icon'} onClick={() => handleButtonClick(index)}>
                                <ImagePlusIcon className={"size-5"}/>
                            </Button>
                        </div>
                        <div
                            className={cn("relative bg-muted/60 hover:bg-muted flex flex-col justify-center items-center gap-4 aspect-[3/4] rounded",
                                photosLoading ? "opacity-70" : "")}
                        >
                            {photosLoading &&
                                <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
                                    <LoadingComponent text={"Chargement de l'image"}/>
                                </div>}
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, theme.id!)}
                                ref={(el) => setFileInputRef(el, index)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                key={`${theme.name}-${index}`}
                            />
                            {previews[theme.id!] ? (
                                <img src={previews[theme.id!] || undefined} alt="Preview"
                                     className="object-contain w-full h-full rounded"/>
                            ) : getStoredPhotoForTheme(theme.id!) ? (
                                <img src={getStoredPhotoForTheme(theme.id!)?.path} alt="Stored Preview"
                                     className="object-contain w-full h-full rounded"/>
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
