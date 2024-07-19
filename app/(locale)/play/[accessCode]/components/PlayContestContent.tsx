import React, { useRef, useCallback } from "react";
import { TypographyH4, TypographyP, TypographySmall } from "@/components/ui/typography";
import { CameraIcon, EditIcon, ImagePlusIcon } from "lucide-react";

import useContestStore from "@/domain/contest/useContestStore";
import useUserStore from "@/domain/user/useUserStore";
import { Theme } from "@/domain/theme/Theme";
import { useStoredPhotos } from "@/domain/photo/use-stored-photos";
import { usePhotoPreviews } from "@/domain/photo/use-photo-preview";
import { useUploadPhoto } from "@/domain/photo/use-upload-photo";
import { Button } from "@/components/ui/button";
import {cn} from "@/lib/utils";
import LoadingComponent from "@/components/[locale]/loading-component";

export default function PlayContestContent() {
    const { themes, id } = useContestStore();
    const selectedThemes: Theme[] = themes?.filter(theme => theme.selected) || [];
    const { user } = useUserStore();
    const { storedPhotos, setStoredPhotos } = useStoredPhotos(selectedThemes);
    const { previews, setPreview } = usePhotoPreviews();
    const { uploadPhoto, uploading } = useUploadPhoto({
        userId: user?.id!,
        contestId: id!,
        setStoredPhotos
    });

    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const setFileInputRef = useCallback((el: HTMLInputElement | null, index: number) => {
        fileInputRefs.current[index] = el;
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, themeId: string) => {
        const selectedFile = e.target.files?.[0] || null;
        setPreview(themeId, selectedFile);
        uploadPhoto(selectedThemes.find(theme => theme?.id === themeId)!, selectedFile!);
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
                <TypographySmall>
                    <>Vous avez participé à {storedPhotos.length} des {selectedThemes?.length} photos.</>
                </TypographySmall>
            </div>
            <div className="grid w-full gap-8 py-4">
                {selectedThemes?.map((theme, index) => (
                    <div key={index} className={"grid gap-1"}>
                        <div className={"flex w-full justify-between"}>
                            <div className={"flex items-center gap-1"}>
                                {theme.icon.jsx && (
                                    <div className={"p-1 rounded-full bg-primary/5  border-2 border-primary"}>
                                        <theme.icon.jsx className={"text-primary size-5"} />
                                    </div>
                                )}
                                <p className={"text-xs truncate font-medium text-secondary-foreground"}>{theme.name}</p>
                            </div>
                            <Button variant={'ghost'} size={'icon'} onClick={() => handleButtonClick(index)}>
                                <ImagePlusIcon className={"size-5"} />
                            </Button>
                        </div>
                        <div
                            className={cn("relative bg-muted/60 hover:bg-muted flex flex-col justify-center items-center gap-4 aspect-[3/4] rounded",
                                uploading[theme.id!] ? "opacity-70" : "")}
                        >
                            {uploading[theme.id!] && <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
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
                                     className="object-cover w-full h-full rounded" />
                            ) : getStoredPhotoForTheme(theme.id!) ? (
                                <img src={getStoredPhotoForTheme(theme.id!)?.url} alt="Stored Preview"
                                     className="object-cover w-full h-full rounded" />
                            ) : (
                                <CameraIcon className="text-secondary-foreground/50 size-8" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
