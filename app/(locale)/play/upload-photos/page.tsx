'use client'
import {TypographyH1, TypographyH4, TypographyMuted, TypographyP, TypographySmall} from "@/components/ui/typography";
import {CameraIcon, UndoIcon} from "lucide-react";
import useUserStore from "@/domain/user/useUserStore";
import useContestStore from "@/domain/contest/useContestStore";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function UploadPhotosPage() {
    const {user} = useUserStore()
    const router = useRouter()
    const {title, description, themes, endDate} = useContestStore()
    const selectedThemes = themes?.filter(theme => theme.selected)

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
            <div className={"flex flex-col items-center gap-4"}>
                <TypographyH4><>Participez au concours : {title}</></TypographyH4>
                <TypographyMuted>
                    <>{`par ${user.name}`}</>
                </TypographyMuted>
                <TypographyP>{description}</TypographyP>
                <Tabs defaultValue="open" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="open">1. Jouer</TabsTrigger>
                        <TabsTrigger value="vote">2. Voter</TabsTrigger>
                        <TabsTrigger value="results">3. Résultats</TabsTrigger>
                    </TabsList>
                    <TabsContent value="open">
                        <div className={"grid gap-1"}>
                            <TypographySmall><>Vous avez particité sur 0 des {selectedThemes?.length} photos.</></TypographySmall>
                            <TypographyH4>N°1 Phase de publication</TypographyH4>
                            <TypographyP>{'Pour chaque thème, importez une photo qui correspond le mieux au thème.'}</TypographyP>
                        </div>
                        <div className="grid w-full grid-cols-2 md:grid-cols-3  gap-2 py-4">
                            {selectedThemes?.map((theme, index) => (
                                <div
                                    key={`${theme.name}-${index}`}
                                    className="bg-secondary/50 hover:bg-secondary/80  flex flex-col justify-center items-center gap-4 aspect-[3/4] p-2 rounded "
                                >
                                    <CameraIcon className={'text-secondary-foreground/50'}/>
                                    <div className={"flex items-center gap-1"}>
                                        {theme.icon.jsx &&
                                            <theme.icon.jsx className={'text-secondary-foreground/80 size-4'}/>}
                                        <p className={"text-xs  truncate text-secondary-foreground/80"}>{theme.name}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="vote">
                        <div className={"grid gap-1"}>
                            <TypographyH4>N°2 Phase de vote</TypographyH4>
                            <TypographyP>{'Lorsque tout les participants ont publié leurs photos, chacun peut voter pour la meilleure photo de chaque thème.'}</TypographyP>
                        </div>
                    </TabsContent>
                    <TabsContent value="results">
                        <div className={"grid gap-1"}>
                            <TypographyH4>N°3 Résultats</TypographyH4>
                            <TypographyP>{'Lorsque tout les participants ont voté, vous pourrez découvrir le ou la meilleur(e) photographe !'}</TypographyP>
                        </div>
                    </TabsContent>
                </Tabs>

            </div>

        </>

    )
}