import {TypographySmall} from "@/components/ui/typography";
import {Progress} from "@/components/ui/progress";
import {Theme} from "@/domain/theme/Theme";
import CarouselVote from "@/app/(locale)/play/[accessCode]/components/vote/components/CarousselVote";
import React from "react";
import useContestStore from "@/domain/contest/useContestStore";
import {useAllStoredPhotos} from "@/domain/photo/use-all-stored-photos";
import {useAllPhotoPreviews} from "@/domain/photo/use-all-photos-preview";
import useFetchNumberOfVotes from "@/domain/contest/use-fetch-number-of-votes";
import useGeneralStatsContest from "@/domain/contest/use-general-stats-contest";
import {Photo} from "@/domain/photo/Photo";

export default function VoteContentAvailable() {
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

    return <>
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
}