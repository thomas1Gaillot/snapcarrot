'use client'
import {BookAIcon, MedalIcon, PlayIcon} from "lucide-react";
import AdminContestsLink from "@/app/(locale)/on-boarding/create-join-contest/components/admin-contests-link";
import MyContestsLink from "@/app/(locale)/on-boarding/create-join-contest/components/my-contests-link";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Separator} from "@/components/ui/separator";
import FinishedContestLink from "@/app/(locale)/on-boarding/create-join-contest/components/finished-contest-link";

export default function CreateJoinContest() {
    return <>
        <Tabs defaultValue={"my-contests"} className="w-full h-full flex flex-col">
            <TabsContent className={"h-full"} value={"my-contests"}>
                <MyContestsLink/>
            </TabsContent>
            <TabsContent className={"h-full"} value={"admin-contests"}>
                <AdminContestsLink/>
            </TabsContent>
            <TabsContent className={"h-full"} value={"finished-contests"}>
                <FinishedContestLink/>
            </TabsContent>
            <Separator/>
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                    className={"flex flex-col"}
                    variant={'mobile'}
                    value="admin-contests"
                >
                    <BookAIcon className="size-4"/>

                    Concours créés
                </TabsTrigger>
                <TabsTrigger
                    variant={'mobile'}
                    value="my-contests"
                    className={"flex flex-col"}
                >
                    <PlayIcon className="size-4"/>
                    Participations
                </TabsTrigger>

                <TabsTrigger
                    className={"flex flex-col"}
                    variant={'mobile'}
                    value="finished-contests"
                >
                    <MedalIcon className="size-4"/>
                    Terminés
                </TabsTrigger>
            </TabsList>
        </Tabs>


    </>
}



