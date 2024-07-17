import {TypographyP, TypographySmall} from "@/components/ui/typography";
import {CameraIcon} from "lucide-react";
import useContestStore from "@/domain/contest/useContestStore";

export default function PlayContestContent() {
    const {themes} = useContestStore()

    const selectedThemes = themes?.filter(theme => theme.selected)

    return <>
        <div className={"grid gap-1"}>
            <TypographyP>{'Pour chaque thème, chargez une photo qui correspond le mieux au thème.'}</TypographyP>
            <TypographySmall>
                <>Vous avez particité à 0 des {selectedThemes?.length} photos.</>
            </TypographySmall>
        </div>
        <div className="grid w-full gap-8 py-4">
            {selectedThemes?.map((theme, index) => (
                <div className={"grid gap-1"}>
                    <div className={"flex items-center gap-1"}>
                        {theme.icon.jsx &&
                            <theme.icon.jsx className={'text-secondary-foreground/80 size-5'}/>}
                        <p className={"text-xs  truncate text-secondary-foreground/80"}>{theme.name}</p>
                    </div>
                    <div
                        key={`${theme.name}-${index}`}
                        className="bg-secondary/50 hover:bg-secondary/80  flex flex-col justify-center items-center gap-4 aspect-[3/4] p-2 rounded "
                    >
                        <CameraIcon className={'text-secondary-foreground/50'}/>
                    </div>
                </div>

            ))}
        </div>
    </>
}
