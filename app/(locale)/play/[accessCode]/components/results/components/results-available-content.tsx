import WinnerBanner from "@/app/(locale)/play/[accessCode]/components/results/components/WinnerBanner";
import WinnerTable from "@/app/(locale)/play/[accessCode]/components/results/components/WinnerTable";
import {useEffect, useState} from "react";
import {Result} from "@/domain/result/Result";
import useContestStore from "@/domain/contest/useContestStore";

export default function ResultsAvailableContent(){
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


    return <>
        {results.length >= 0  && <WinnerBanner results={results}/>}
        {results.length >= 0 && <WinnerTable results={results}/>}
    </>
}