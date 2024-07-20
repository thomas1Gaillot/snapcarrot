'use client'
import {TypographyH4, TypographyP} from "@/components/ui/typography";
import {LoaderCircleIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import React, {useEffect} from "react";
import useContestStore from "@/domain/contest/useContestStore";
import {Theme} from "@/domain/theme/Theme";
import {useAllStoredPhotos} from "@/domain/photo/use-all-stored-photos";
import {useAllPhotoPreviews} from "@/domain/photo/use-all-photos-preview";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {Photo} from "@/domain/photo/Photo";
import CarouselVote from "@/app/(locale)/play/[accessCode]/components/vote/CarousselVote";

export default function VotePage() {
    const {themes, id} = useContestStore();
    const selectedThemes: Theme[] = themes?.filter(theme => theme.selected) || [];
    const {storedPhotos} = useAllStoredPhotos(id, selectedThemes);
    const {previews} = useAllPhotoPreviews();

    const getStoredPhotosForTheme = (themeId: string):Photo[] => {
        const themeIndex = selectedThemes.findIndex(theme => theme.id === themeId);
        return storedPhotos[themeIndex] || [];
    };

    return (
        <>
            <div className={"grid gap-1"}>
                <TypographyH4>Phase de vote</TypographyH4>
                <TypographyP>{'Lorsque tout les participants ont publié leurs photos, chacun peut voter pour la meilleure photo de chaque thème.'}</TypographyP>
            </div>
            <div className="grid w-full gap-8 py-4">
                {selectedThemes?.map((theme:Theme, index) => (
                    <CarouselVote
                        key={index}
                        themeName={theme.name}
                        themeIcon={theme.icon}
                        photos={getStoredPhotosForTheme(theme.id!)}
                        previews={previews[theme.id!] || {}}
                    />
                ))}
            </div>
        </>
    )
}
