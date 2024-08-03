'use client'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import PlayContestContent from "@/app/(locale)/play/[accessCode]/components/play/PlayContestContent";
import VotePage from "@/app/(locale)/play/[accessCode]/components/vote/Vote";
import ResultsPage from "@/app/(locale)/play/[accessCode]/components/results/Result";
import {contestIcon, Status} from "@/domain/status/Status";
import Image from "next/image";
import {useQuery} from "@tanstack/react-query";
import {fetchContest} from "@/domain/contest/fetch-contest";
import {useParams} from "next/navigation";

export default function PlayPage() {
    const params = useParams();
    const accessCode = params ? params.accessCode : null;

    const {data: contest, isLoading, error} = useQuery({
        queryKey: ['contest', accessCode],
        enabled: !!accessCode,
        queryFn: () => fetchContest(accessCode as string),
    })
    if (isLoading) return <>isLoadingPage ... </>
    return <div className={"flex flex-col h-full "}>
        <Tabs defaultValue={"open"} className="w-full mt-8">
            <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger
                    value="open"
                >
                    <Image alt={'play-image-on'} src={contestIcon(Status.open, true)}
                           width={48} height={48}
                           className="p-2 rounded flex items-center py-1"/>
                </TabsTrigger>
                <TabsTrigger
                    value="vote"
                >
                    <Image alt={'vote-image'} src={contestIcon(Status.voting, contest?.status !== Status.open)}
                           width={48} height={48}
                           className="p-2 rounded flex items-center py-1"/>
                </TabsTrigger>
                <TabsTrigger
                    value="result"
                >
                    <Image alt={'results-image'} src={contestIcon(Status.results, contest?.status === Status.results)}
                           width={48} height={48}
                           className="p-2  rounded flex items-center py-1"/>
                </TabsTrigger>
            </TabsList>
            <TabsContent value={"open"}>
                {contest && <PlayContestContent id={contest.id}/>}
            </TabsContent>
            <TabsContent value={"vote"}>
                {contest && <VotePage contest={contest} accessCode={accessCode as string}/>}
            </TabsContent>
            <TabsContent value={"result"}>
                {contest && <ResultsPage contest={contest} accessCode={accessCode as string}/>}
            </TabsContent>

        </Tabs>
    </div>
}
