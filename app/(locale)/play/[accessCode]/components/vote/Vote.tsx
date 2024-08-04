'use client'
import {TypographyH4, TypographyP} from "@/components/ui/typography";
import React from "react";
import VoteContentAvailable from "@/app/(locale)/play/[accessCode]/components/vote/components/vote-content-available";
import {Status} from "@/domain/status/Status";
import useUserStore from "@/domain/user/useUserStore";
import {Button} from "@/components/ui/button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Contest} from "@/domain/contest/Contest";
import {updateContestStatus} from "@/domain/contest/use-update-status";

export default function VotePage({contest, accessCode}: { contest: Contest, accessCode: string }) {
    const {user} = useUserStore()
    const queryClient = useQueryClient()
    // Define the mutation for updating the contest status
    const mutation = useMutation({
                mutationFn: (newStatus: Status) => updateContestStatus(contest.id, newStatus),
                onSuccess: (contestUpdated) => {
                    queryClient.invalidateQueries({
                        queryKey: ["contest", accessCode],
                    })
                    // Handle success - update local state or show a success message
                    console.log("Contest status updated successfully:", contestUpdated);
                },
                onError: (error) => {
                    // Handle error - show an error message or retry logic
                    console.error("Error updating contest status:", error);
                },
    });

    // Function to handle the voting phase submission
    function submitVotePhase() {
        mutation.mutate(Status.voting);
    }

    return (
        <>
            <div className={"grid gap-1"}>
                <TypographyH4>Phase de vote</TypographyH4>
                <TypographyP>{'Lorsque tout les participants ont publié leurs photos, chacun peut voter pour la meilleure photo de chaque thème.'}</TypographyP>
            </div>
            {contest?.status !== Status.open && (
                <VoteContentAvailable/>
            )}
            {contest?.status === Status.open && user.id === contest?.adminUser?.id && (
                <div className={"grid gap-4 mt-4"}>
                    <TypographyP>Clore la phase ouverte et passer à la phase de votes</TypographyP>
                    <Button onClick={submitVotePhase}>Passer à la phase de vote</Button>
                </div>
            )}

        </>
    )
}
