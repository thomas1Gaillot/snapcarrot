'use client'
import useUserStore from "@/domain/user/useUserStore";
import {UndoIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TypographyH1, TypographyP} from "@/components/ui/typography";
import {useRouter} from "next/navigation";
import AdminContestsLink from "@/app/(locale)/on-boarding/create-join-contest/components/admin-contests-link";
import MyContestsLink from "@/app/(locale)/on-boarding/create-join-contest/components/my-contests-link";

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
        <AdminContestsLink/>
        <MyContestsLink/>
    </>
}



