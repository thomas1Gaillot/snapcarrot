'use client'
import {HomeIcon, MedalIcon, PlusCircleIcon} from "lucide-react";
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
            <TabsList variant={'mobile'} className="grid w-full grid-cols-2">
                <TabsTrigger
                    variant={'mobile'}
                    value="my-contests"
                    className={"flex flex-col"}
                >
                    <HomeIcon className="size-5"/>
                    Accueil
                </TabsTrigger>
                <TabsTrigger
                    className={"flex flex-col"}
                    variant={'mobile'}
                    value="admin-contests"
                >
                    <PlusCircleIcon className="size-5"/>

                    Concours créés
                </TabsTrigger>
            </TabsList>
        </Tabs>


    </>
}



