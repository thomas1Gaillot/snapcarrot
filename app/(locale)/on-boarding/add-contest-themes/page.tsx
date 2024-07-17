'use client'
import {Button} from "@/components/ui/button";
import {TypographyH1} from "@/components/ui/typography";
import {useRouter} from "next/navigation";
import {UndoIcon} from "lucide-react";
import useContestStore from "@/domain/useContestStore";
import {toast} from "@/components/hooks/use-toast";
import {cn} from "@/lib/utils";


export default function AddContestThemes() {
    const router = useRouter()
    const {themes, setThemes} = useContestStore()

    function onSubmit() {
        const numSelectedThemes = themes.filter(theme => theme.selected).length
        if(numSelectedThemes < 1) {
            toast({title : 'Veuillez sélectionner au moins un thème'})
            return;
        }
        setThemes(themes)
        router.push('/on-boarding/publish-contest')
    }

    function toggleTheme(index: number) {
        const newThemes = [...themes]
        newThemes[index].selected = !newThemes[index].selected
        setThemes(newThemes)
    }

    return (<>
            <Button className={'w-max'} onClick={() => router.push('/on-boarding/add-contest-description')}
                    variant={'secondary'}>
                <UndoIcon className={"text-gray-800 size-4"}/>
            </Button>
            <TypographyH1>{'Enfin, ajoutez vos thèmes'}</TypographyH1>
            <p className={"leading-7 text-gray-800"}>
                {"Ajoutez des thèmes pour votre concours. Les participants pourront soumettre des photos en fonction de ces thèmes."}
            </p>
        <div className={"grid grid-cols-2 gap-2"}>
            {themes.map((theme, index) => (

                <Button className={cn("h-12 ", theme.selected && 'border border-primary')} variant={theme.selected ? 'secondary' : 'outline'} onClick={() => toggleTheme(index)}
                        key={index}>
                    <div className={"flex gap-2 items-center"}>
                    <theme.icon />
                    <span className={"text-gray-800 italic "}>
                        {theme.name}
                    </span>
                    </div>
                </Button>

            ))}
        </div>
            <div className={"grid gap-2 text-center py-4"}>
                <Button type={"submit"} onClick={onSubmit} size={'lg'} variant={'default'}>Etape suivante</Button>
            </div>
        </>
    );
}