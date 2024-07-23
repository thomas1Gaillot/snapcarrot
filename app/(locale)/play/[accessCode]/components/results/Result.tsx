'use client'
import {TypographyH4, TypographyP} from "@/components/ui/typography";
import {Result} from "@/domain/result/Result";
import WinnerBanner from "./components/WinnerBanner";
import WinnerTable from "./components/WinnerTable";
import React, {useEffect, useState} from "react";
import useContestStore from "@/domain/contest/useContestStore";
import useUserStore from "@/domain/user/useUserStore";
import {Status} from "@/domain/status/Status";
import ResultsAvailableContent
    from "@/app/(locale)/play/[accessCode]/components/results/components/results-available-content";
import {Button} from "@/components/ui/button";
import useUpdateContestStatus from "@/domain/contest/use-update-status";
const fakeResults: Result[] = [{
    id: '1',
    user: {
        id: '1',
        email: '',
        name: 'John Doe'
    },
    points: 1750,
    rank: 1
},
    {
        id: '2',
        user: {
            id: '2',
            email: '',
            name: 'Jane Doe'
        },
        points: 750,
        rank: 2
    },
    {
        id: '3',
        user: {
            id: '3',
            email: '',
            name: 'Jack Doe'
        },
        points: 50,
        rank: 3
    }
]

export default function ResultsPage() {
    const {id, status, adminUser, setContest} = useContestStore()
    const {user} = useUserStore()
    const {updateContestStatus} = useUpdateContestStatus()


    async function submitCalculateResults() {
        const contest = await updateContestStatus(id, Status.results)
        setContest(contest)
    }
    return (
        <>
            <div className={"grid gap-1"}>
                <TypographyH4>Résultats</TypographyH4>
                <TypographyP>{'Lorsque tout les participants ont voté, vous pourrez découvrir le ou la meilleur(e) photographe !'}</TypographyP>
                {status === Status.results && <ResultsAvailableContent/>}
                {status === Status.voting && user.id === adminUser.id && (
                    <div className={"grid gap-1"}>
                        <TypographyP>Clore la phase de votes et calculer les résultats</TypographyP>
                        <Button onClick={submitCalculateResults}>Clore la phase de vote</Button>
                    </div>
                )}
            </div>
        </>

    )
}




