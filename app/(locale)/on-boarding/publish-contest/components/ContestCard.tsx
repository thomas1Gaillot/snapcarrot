import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {TypographyH4, TypographyMuted, TypographyP} from "@/components/ui/typography";
import {CameraIcon} from "lucide-react";
import useUserStore from "@/domain/user/useUserStore";
import useContestStore from "@/domain/contest/useContestStore";

export default function ContestCard() {

    const {user} = useUserStore()
    const {title, description, themes, endDate} = useContestStore()
    const selectedThemes = themes.filter(theme => theme.selected)

    return <Card className={' overflow-y-auto h-full'}>
        <CardContent>
            <CardHeader className={"flex flex-col items-center gap-4"}>
                <TypographyH4>{title}</TypographyH4>
                <TypographyMuted>
                    <>{`par ${user.name}`}</>
                </TypographyMuted>
                <TypographyP>{description}</TypographyP>
                <div className={"grid gap-1"}>
                    <TypographyH4>N°1 Phase de publication</TypographyH4>
                    <TypographyP>{'Pour chaque thème, importez une photo qui correspond le mieux au thème.'}</TypographyP>
                </div>
                <div className="grid w-full grid-cols-2 md:grid-cols-3  gap-2 py-4">
                    {selectedThemes.map((theme, index) => (
                        <div
                            key={`${theme.name}-${index}`}
                            className="bg-secondary/50 hover:bg-secondary/80  flex flex-col justify-center items-center gap-4 aspect-[3/4] p-2 rounded "
                        >
                            <CameraIcon className={'text-secondary-foreground/50'}/>
                            <div className={"flex items-center gap-1"}>
                                {theme.icon.jsx && <theme.icon.jsx className={'text-secondary-foreground/80 size-4'}/>}
                                <p className={"text-xs  truncate text-secondary-foreground/80"}>{theme.name}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </CardHeader>
            <CardFooter className={"grid gap-4 py-4"}>
                <div className={"grid gap-1"}>
                    <TypographyH4>N°2 Phase de vote</TypographyH4>
                    <TypographyP>{'Lorsque tout les participants ont publié leurs photos, chacun peut voter pour la meilleure photo de chaque thème.'}</TypographyP>
                </div>
                <div className={"grid gap-1"}>
                    <TypographyH4>N°3 Résultats</TypographyH4>
                    <TypographyP>{'Lorsque tout les participants ont voté, vous pourrez découvrir le ou la meilleur(e) photographe !'}</TypographyP>
                </div>
            </CardFooter>
        </CardContent>
    </Card>
}