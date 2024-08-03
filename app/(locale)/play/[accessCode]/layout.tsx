'use client'
import {useParams, useRouter} from "next/navigation";
import LoadingComponent from "@/components/[locale]/loading-component";
import ContestHeader from "@/app/(locale)/play/[accessCode]/components/ContestHeader";
import {fetchContest} from "@/domain/contest/fetch-contest";
import {useQuery} from "@tanstack/react-query";
import {toast} from "@/components/hooks/use-toast";
import ErrorInline from "@/components/[locale]/error-inline";
import {fetchThemes} from "@/domain/contest/fetch-themes";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    const params = useParams();
    const accessCode = params ? params.accessCode : null;
    const router = useRouter();

    const {data: contest, isLoading, error} = useQuery({
        queryKey: ['contest', accessCode],
        enabled: !!accessCode,
        queryFn: () => fetchContest(accessCode as string),
    })
    const {data: themes, isLoading: themesLoading, error: themesError} = useQuery({
        queryKey: ['themes', contest?.id],
        enabled: !!contest?.id,
        queryFn: () => fetchThemes(contest?.id),
    });

    if (themesError) return <ErrorInline error={themesError}/>

    if (error) {
        toast({title: 'Contest not found'});
        router.push('/on-boarding/create-join-contest');
    }

    if (contest && themes) {
        const contestWithThemes = {
            ...contest,
            themes,
        };
        return <>
            {contest && <ContestHeader contest={contestWithThemes}/>}
            {isLoading ?
                <div className="flex flex-col items-center justify-center h-screen space-y-4">
                    <LoadingComponent/>
                </div> : <>{children}</>
            }

        </>
    }

    return null;

}
