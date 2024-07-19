'use client'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {MedalIcon, MessageCircleHeartIcon, PlayIcon} from "lucide-react";
import PlayContestContent from "@/app/(locale)/play/[accessCode]/components/PlayContestContent";
import VotePage from "@/app/(locale)/play/[accessCode]/components/Vote";
import ResultsPage from "@/app/(locale)/play/[accessCode]/components/Result";

export default function PlayPage() {
    return <div className={"flex flex-col h-full "}>
        <Tabs defaultValue={"open"} className="w-full mt-8">
            <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger
                    value="open"
                >
                    <PlayIcon className={'size-6 ml-2'}/>
                </TabsTrigger>
                <TabsTrigger
                    value="vote"
                >
                    <MessageCircleHeartIcon className={'size-6 ml-2'}/>
                </TabsTrigger>
                <TabsTrigger
                    value="results"
                >
                    <MedalIcon className={'size-6 ml-2'}/>
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