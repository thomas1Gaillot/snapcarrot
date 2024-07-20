'use client'
import useUserStore from "@/domain/user/useUserStore";
import {UndoIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TypographyH1, TypographyP} from "@/components/ui/typography";
import {useRouter} from "next/navigation";
import AdminContestsLink from "@/app/(locale)/on-boarding/create-join-contest/components/admin-contests-link";
import MyContestsLink from "@/app/(locale)/on-boarding/create-join-contest/components/my-contests-link";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function CreateJoinContest() {
    const router = useRouter();
    const {user} = useUserStore();
    return <>
        <Button className={'w-max'} onClick={() => router.push('/on-boarding/start-with-username')}
                variant={'secondary'}>
            <UndoIcon className={"text-gray-800 size-4"}/>
        </Button>
        <TypographyH1>{`Bienvenue ${user?.name}`}</TypographyH1>
        <TypographyP>{"Créez un concours ou rejoignez-en un pour commencer à jouer."}</TypographyP>
        <div className={"grid grid-cols-2 gap-4 py-4"}>
            <Button size={'lg'} variant={'secondary'} onClick={() => router.push('/on-boarding/join-contest')}>Rejoindre
                un concours</Button>
            <Button size={'lg'} onClick={() => router.push('/on-boarding/add-contest-title')} variant={'default'}>Créer
                un concours</Button>
        </div>
        <Tabs defaultValue={"my-contests"} className="w-full mt-8">
            <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger
                    value="my-contests"
                >
                    Mes participations
                </TabsTrigger>
                <TabsTrigger
                    value="admin-contests"
                >
                    Mes concours
                </TabsTrigger>
            </TabsList>
            <TabsContent value={"my-contests"}>
                <MyContestsLink/>
            </TabsContent>
            <TabsContent value={"admin-contests"}>
                <AdminContestsLink/>
            </TabsContent>

        </Tabs>


    </>
}



