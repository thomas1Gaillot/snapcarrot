'use client'
import {TypographyH4, TypographyP} from "@/components/ui/typography";
import React from "react";
import useUserStore from "@/domain/user/useUserStore";
import {Status} from "@/domain/status/Status";
import ResultsAvailableContent
    from "@/app/(locale)/play/[accessCode]/components/results/components/results-available-content";
import {Button} from "@/components/ui/button";
import {Contest} from "@/domain/contest/Contest";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateContestStatus} from "@/domain/contest/use-update-status";

export default function ResultsPage({contest, accessCode}: { contest: Contest, accessCode: string }) {
    const {user} = useUserStore()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (newStatus: Status) => updateContestStatus(contest.id, newStatus),
        onSuccess: (contestUpdated) => {
            queryClient.invalidateQueries({
                queryKey: ["contest", accessCode],
                exact: true
            })
            console.log("Contest status updated successfully:", contestUpdated);
        },
        onError: (error) => {
            console.error("Error updating contest status:", error);
        },
    });

    // Function to handle the voting phase submission
    function submitCalculateResults() {
        mutation.mutate(Status.results);
    }

    return (
        <>
            <div className={"grid gap-1"}>
                <TypographyH4>Résultats</TypographyH4>
                <TypographyP>{'Lorsque tout les participants ont voté, vous pourrez découvrir le ou la meilleur(e) photographe !'}</TypographyP>
                {contest?.status === Status.results && <ResultsAvailableContent contestId={contest?.id}/>}
                {contest?.status === Status.voting && user.id === contest?.adminUser?.id && (
                    <div className={"grid gap-4 mt-4 "}>
                        <TypographyP>Clore la phase de votes et calculer les résultats</TypographyP>
                        <Button loading={mutation.isPending} onClick={submitCalculateResults}>Clore la phase de vote</Button>
                    </div>
                )}
            </div>
        </>

    )
}




