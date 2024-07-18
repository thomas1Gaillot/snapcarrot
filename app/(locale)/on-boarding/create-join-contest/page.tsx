'use client'
import useUserStore from "@/domain/user/useUserStore";
import {ArrowRight, ArrowRightIcon, UndoIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TypographyH1, TypographyH4, TypographyP, TypographySmall} from "@/components/ui/typography";
import {useRouter} from "next/navigation";
import useUserContests from "@/domain/contest/use-user-contests";
import {useEffect} from "react";
import {Card, CardHeader} from "@/components/ui/card";

export default function CreateJoinContest() {
    const {user} = useUserStore()
    const router = useRouter()
    const {getMyContests, contests} = useUserContests()
    useEffect(() => {
        if(user.id){
            getMyContests(user.id)
        }
    }, [user]);
    return <>
        <Button className={'w-max'} onClick={() => router.push('/on-boarding/start-with-username')} variant={'secondary'}>
            <UndoIcon className={"text-gray-800 size-4"} />
        </Button>
        <TypographyH1>{`Bienvenue ${user.name}`}</TypographyH1>
        <TypographyP>{"Créez un concours ou rejoignez-en un pour commencer à jouer."}</TypographyP>
        <div className={"grid grid-cols-2 gap-4 py-4"}>
            <Button  size={'lg'} variant={'secondary'} onClick={() => router.push('/on-boarding/join-contest')}>Rejoindre un concours</Button>
            <Button  size={'lg'}  onClick={() => router.push('/on-boarding/add-contest-title')} variant={'default'}>Créer un concours</Button>
        </div>
        {contests.length >0 && <TypographyH4>{`Les concours que j'ai créé`}</TypographyH4>}
        <div className={"grid gap-4 py-4"}>
            {contests.map(contest =>
                <Button variant={'ghost'} className={'flex flex-col items-start h-max'} key={contest.id} onClick={() => router.push(`/play/${contest.accessCode}/upload-photos`)}>
                    {contest.title}
                    <TypographySmall><>code : {contest.accessCode}</></TypographySmall>
                    <ArrowRightIcon className={"size-4"}/>
                </Button>
            )}
        </div>
    </>
}
