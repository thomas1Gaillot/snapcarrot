import WinnerBanner from "@/app/(locale)/play/[accessCode]/components/results/components/WinnerBanner";
import WinnerTable from "@/app/(locale)/play/[accessCode]/components/results/components/WinnerTable";
import {Result} from "@/domain/result/Result";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton";
import WinnerCarouselWithPoints
    from "@/app/(locale)/play/[accessCode]/components/results/components/WinnerCarouselWithPoints";

export default function ResultsAvailableContent({contestId}: { contestId: string }) {
    const params = useParams()
    const accessCode = params ? params.accessCode : null;

    const {data: results, isLoading, error} = useQuery({
        queryKey: ['contest', accessCode, "results"],
        enabled: !!contestId,
        queryFn: () => fetchResults(contestId),
    })


    async function fetchResults(contestId: string) {
        const response = await fetch(`/api/result/calculate?contestId=${contestId}`);
        const data: Result[] = await response.json();
        return data
    }

    if (isLoading) return <Skeleton className="w-full h-[60px] rounded"/>;
    if (!results) return <>Aucun résultats ...</>

    return <>
        {results.length >= 0 && <WinnerBanner results={results}/>}
        {results.length >= 0 && <WinnerTable results={results}/>}
        {results.length >= 0 && <WinnerCarouselWithPoints contestId={contestId}/>}
    </>
}