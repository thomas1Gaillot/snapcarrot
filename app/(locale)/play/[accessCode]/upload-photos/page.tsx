'use client'
import {TypographyBlockquote, TypographyH4, TypographyMuted, TypographyP} from "@/components/ui/typography";
import {MedalIcon, MessageCircleHeartIcon, PlayIcon, Share2Icon, UndoIcon} from "lucide-react";
import useUserStore from "@/domain/user/useUserStore";
import useContestStore from "@/domain/contest/useContestStore";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import PlayContestContent from "@/app/(locale)/play/[accessCode]/components/PlayContestContent";
import useCopyToClipboard from "@/hooks/use-copy-to-clipboard";
import {toast} from "@/components/hooks/use-toast";
import useGeneralStatsContest from "@/domain/contest/use-general-stats-contest";

export default function UploadPhotosPage() {
    const {user} = useUserStore()
    const router = useRouter()
    const {title, accessCode, description, themes, endDate} = useContestStore()
    const {copyToClipboard, buttonRef} = useCopyToClipboard()
    const {numberOfParticipants, numberOfThemes, numberOfPhotos} = useGeneralStatsContest()
    useEffect(() => {
        if (!title || !description || !themes || !endDate) {
            router.push('/on-boarding/create-join-contest')
        }
    }, [title, description, themes, endDate]);

    function handleCopyToClipboardClick() {
        copyToClipboard(accessCode || '')
        toast({title: 'Copié !', description: "Le code d'accès a été copié dans votre presse-papier."})
    }

    return (
        <>
            <div className={'flex items-center justify-between gap-4'}>
                <Button className={'w-max'} onClick={() => router.push('/on-boarding/create-join-contest')}
                        variant={'secondary'}>
                    <UndoIcon className={"text-gray-800 size-4"}/>
                </Button>
                <div className={"flex flex-col w-full"}>
                    <p className={"font-semibold text-sm"}>{title}</p>
                    <TypographyMuted>
                        <>{`publié par ${user.name}`}</>
                    </TypographyMuted>
                </div>
                <Button ref={buttonRef} onClick={handleCopyToClipboardClick} variant={'secondary'}>
                    <Share2Icon className={"text-gray-800 size-4"}/>
                </Button>
            </div>
            <div className={"grid grid-cols-3"}>
                <div className={"grid gap-1 text-center"}>
                    <p className={'font-bold'}>{numberOfParticipants}</p>
                    <p className={'text-xs'}>participants</p>
                </div>
                <div className={"grid gap-1 text-center"}>
                    <p className={'font-bold'}>{numberOfThemes}</p>
                    <p className={'text-xs'}>thèmes</p>
                </div>
                <div className={"grid gap-1 text-center"}>
                    <p className={'font-bold'}>{numberOfPhotos}</p>
                    <p className={'text-xs'}>photos publiées</p>
                </div>
            </div>
            <TypographyBlockquote>{description}</TypographyBlockquote>

            <div className={"flex flex-col h-full "}>
                <Tabs defaultValue="open" className="w-full mt-8">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="open">
                            <>
                                <PlayIcon className={'size-6 ml-2'}/>
                            </>
                        </TabsTrigger>
                        <TabsTrigger value="vote"><MessageCircleHeartIcon className={'size-6 ml-2'}/></TabsTrigger>
                        <TabsTrigger value="results"><MedalIcon className={'size-6 ml-2'}/></TabsTrigger>
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
