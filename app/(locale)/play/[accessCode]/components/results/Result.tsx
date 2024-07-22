'use client'
import {TypographyH4, TypographyP} from "@/components/ui/typography";
import {Result} from "@/domain/result/Result";
import WinnerBanner from "./components/WinnerBanner";
import WinnerTable from "./components/WinnerTable";
import {useEffect, useState} from "react";
import useContestStore from "@/domain/contest/useContestStore";
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
    const {id} = useContestStore()
    const [results, setResults] = useState<Result[]>([]);

    useEffect(() => {
        async function fetchResults() {
            const response = await fetch(`/api/result/calculate?contestId=${id}`);
            const data = await response.json();
            setResults(data);
        }
        if(id){
            fetchResults();
        }
    }, [id]);
    console.log(results)

    return (
        <>
            <div className={"grid gap-1"}>
                <TypographyH4>Résultats</TypographyH4>
                <TypographyP>{'Lorsque tout les participants ont voté, vous pourrez découvrir le ou la meilleur(e) photographe !'}</TypographyP>
                {results.length >= 0  && <WinnerBanner results={results}/>}
                {results.length >= 0 && <WinnerTable results={results}/>}
            </div>
        </>

    )
}




