'use client'
import {TypographyH4, TypographyP, TypographySmall} from "@/components/ui/typography";
import React from "react";
import useContestStore from "@/domain/contest/useContestStore";
import {Theme} from "@/domain/theme/Theme";
import {useAllStoredPhotos} from "@/domain/photo/use-all-stored-photos";
import {useAllPhotoPreviews} from "@/domain/photo/use-all-photos-preview";
import {Photo} from "@/domain/photo/Photo";
import CarouselVote from "@/app/(locale)/play/[accessCode]/components/vote/CarousselVote";
import {Progress} from "@/components/ui/progress";
import useFetchNumberOfVotes from "@/domain/contest/use-fetch-number-of-votes";
import useGeneralStatsContest from "@/domain/contest/use-general-stats-contest";

export default function VotePage() {
    const {themes, id} = useContestStore();
    const selectedThemes: Theme[] = themes?.filter(theme => theme.selected) || [];
    const {storedPhotos} = useAllStoredPhotos(id, selectedThemes);
    const {previews} = useAllPhotoPreviews();
    const {numberOfVotes} = useFetchNumberOfVotes();
    const {numberOfParticipants} = useGeneralStatsContest()

    const getStoredPhotosForTheme = (themeId: string): Photo[] => {
        const themeIndex = selectedThemes.findIndex(theme => theme.id === themeId);
        return storedPhotos[themeIndex] || [];
    };
    const numberOfTotalVotes = selectedThemes?.length * Number(numberOfParticipants);
    return (
        <>
            <div className={"grid gap-1"}>
                <TypographyH4>Phase de vote</TypographyH4>
                <TypographyP>{'Lorsque tout les participants ont publié leurs photos, chacun peut voter pour la meilleure photo de chaque thème.'}</TypographyP>
            </div>
            <div className={'grid py-4 gap-1'}>
                <TypographySmall>
                    <> {numberOfVotes} votes ont été attribués sur {numberOfTotalVotes}.</>
                </TypographySmall>
                <Progress value={(numberOfVotes / numberOfTotalVotes) * 100}/>
            </div>
            <div className="grid w-full gap-8 py-4">
                {selectedThemes?.map((theme: Theme, index) => (
                    <CarouselVote
                        key={index}
                        theme={theme}
                        photos={getStoredPhotosForTheme(theme.id!)}
                        previews={previews[theme.id!] || {}}
                    />
                ))}
            </div>
        </>
    )
}
