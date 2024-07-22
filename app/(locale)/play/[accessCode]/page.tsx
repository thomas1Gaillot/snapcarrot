'use client'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import PlayContestContent from "@/app/(locale)/play/[accessCode]/components/play/PlayContestContent";
import VotePage from "@/app/(locale)/play/[accessCode]/components/vote/Vote";
import ResultsPage from "@/app/(locale)/play/[accessCode]/components/results/Result";
import {contestIcon, Status} from "@/domain/status/Status";
import Image from "next/image";

export default function PlayPage() {
    return <div className={"flex flex-col h-full "}>
        <Tabs defaultValue={"open"} className="w-full mt-8">
            <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger
                    value="open"
                >
                    <Image alt={'play-image-on'} src={contestIcon(Status.open, true)}
                           width={64} height={64}
                           className="p-2 rounded flex items-center py-1"/>
                </TabsTrigger>
                <TabsTrigger
                    value="vote"
                >
                    <Image alt={'vote-image'} src={contestIcon(Status.voting, false)}
                           width={64} height={64}
                           className="p-2 rounded flex items-center py-1"/>
                </TabsTrigger>
                <TabsTrigger
                    value="results"
                >
                    <Image alt={'results-image'} src={contestIcon(Status.results, false)}
                           width={64} height={64}
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
