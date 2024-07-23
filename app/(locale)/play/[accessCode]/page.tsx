'use client'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import PlayContestContent from "@/app/(locale)/play/[accessCode]/components/play/PlayContestContent";
import VotePage from "@/app/(locale)/play/[accessCode]/components/vote/Vote";
import ResultsPage from "@/app/(locale)/play/[accessCode]/components/results/Result";
import {contestIcon, Status} from "@/domain/status/Status";
import Image from "next/image";
import useContestStore from "@/domain/contest/useContestStore";

export default function PlayPage() {
    const {status} = useContestStore()
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
                    <Image alt={'vote-image'} src={contestIcon(Status.voting, status !== Status.open)}
                           width={48} height={48}
                           className="p-2 rounded flex items-center py-1"/>
                </TabsTrigger>
                <TabsTrigger
                    value="results"
                >
                    <Image alt={'results-image'} src={contestIcon(Status.results, status === Status.results)}
                           width={48} height={48}
                           className="p-2  rounded flex items-center py-1"/>
                </TabsTrigger>
            </TabsList>
            <TabsContent value={"open"}>
                <PlayContestContent/>
            </TabsContent>
            <TabsContent value={"vote"}>
                <VotePage/>
            </TabsContent>
            <TabsContent value={"results"}>
                <ResultsPage/>
            </TabsContent>

        </Tabs>
    </div>
}
