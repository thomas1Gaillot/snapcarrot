'use client'
import {
    TypographyBlockquote,
    TypographyH4,
    TypographyMuted,
    TypographyP,
    TypographySmall
} from "@/components/ui/typography";
import {CameraIcon, UndoIcon} from "lucide-react";
import useUserStore from "@/domain/user/useUserStore";
import useContestStore from "@/domain/contest/useContestStore";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import PlayContestContent from "@/app/(locale)/play/components/PlayContestContent";

export default function UploadPhotosPage() {
    const {user} = useUserStore()
    const router = useRouter()
    const {title, accessCode, description, themes, endDate} = useContestStore()

    useEffect(() => {
        if (!title || !description || !themes || !endDate) {
            router.push('/on-boarding/create-join-contest')
        }
    }, [title, description, themes, endDate]);

    return (
        <>
            <Button className={'w-max'} onClick={() => router.push('/on-boarding/create-join-contest')}
                    variant={'secondary'}>
                <UndoIcon className={"text-gray-800 size-4"}/>
            </Button>
            <div className={"flex flex-col h-full "}>
                <TypographyH4>{title}</TypographyH4>
                <div className={'flex justify-between'}>
                    <TypographyMuted>
                        <>{`publié par ${user.name}`}</>
                    </TypographyMuted>
                    <TypographyMuted>code : {accessCode || ''}</TypographyMuted>

                </div>
                <TypographyBlockquote>{description}</TypographyBlockquote>
                <Tabs defaultValue="open" className="w-full mt-8">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="open">1. Jouer</TabsTrigger>
                        <TabsTrigger value="vote">2. Voter</TabsTrigger>
                        <TabsTrigger value="results">3. Résultats</TabsTrigger>
                    </TabsList>
                    <TabsContent value="open">
                        <PlayContestContent/>
                    </TabsContent>
                    <TabsContent value="vote">
                        <div className={"grid gap-1"}>
                            <TypographyH4>Phase de vote</TypographyH4>
                            <TypographyP>{'Lorsque tout les participants ont publié leurs photos, chacun peut voter pour la meilleure photo de chaque thème.'}</TypographyP>
                        </div>
                    </TabsContent>
                    <TabsContent value="results">
                        <div className={"grid gap-1"}>
                            <TypographyH4>Résultats</TypographyH4>
                            <TypographyP>{'Lorsque tout les participants ont voté, vous pourrez découvrir le ou la meilleur(e) photographe !'}</TypographyP>
                        </div>
                    </TabsContent>
                </Tabs>

            </div>

        </>

    )
}
