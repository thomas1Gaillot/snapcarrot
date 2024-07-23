'use client'
import {TypographyH4, TypographyP, TypographySmall} from "@/components/ui/typography";
import React from "react";
import useContestStore from "@/domain/contest/useContestStore";
import {Theme} from "@/domain/theme/Theme";
import {useAllStoredPhotos} from "@/domain/photo/use-all-stored-photos";
import {useAllPhotoPreviews} from "@/domain/photo/use-all-photos-preview";
import {Photo} from "@/domain/photo/Photo";
import CarouselVote from "@/app/(locale)/play/[accessCode]/components/vote/components/CarousselVote";
import {Progress} from "@/components/ui/progress";
import useFetchNumberOfVotes from "@/domain/contest/use-fetch-number-of-votes";
import useGeneralStatsContest from "@/domain/contest/use-general-stats-contest";
import VoteContentAvailable from "@/app/(locale)/play/[accessCode]/components/vote/components/vote-content-available";
import {Status} from "@/domain/status/Status";
import useUserStore from "@/domain/user/useUserStore";
import {Button} from "@/components/ui/button";
import useUpdateContestStatus from "@/domain/contest/use-update-status";

export default function VotePage() {
    const {user} = useUserStore()
    const {status ,adminUser, id, setContest} = useContestStore()
    const {updateContestStatus} = useUpdateContestStatus()

    async function submitVotePhase() {
        const contest = await updateContestStatus(id, Status.voting)
        setContest(contest)
    }

    return (
        <>
            <div className={"grid gap-1"}>
                <TypographyH4>Phase de vote</TypographyH4>
                <TypographyP>{'Lorsque tout les participants ont publié leurs photos, chacun peut voter pour la meilleure photo de chaque thème.'}</TypographyP>
            </div>
            {status !== Status.open && (
                <VoteContentAvailable/>
            )}
            {status === Status.open && user.id === adminUser.id && (
                <div className={"grid gap-4 mt-4"}>
                    <TypographyP>Clore la phase ouverte et passer à la phase de votes</TypographyP>
                    <Button onClick={submitVotePhase}>Passer à la phase de vote</Button>
                </div>
            )}

        </>
    )
}
