'use client'
import {Button} from "@/components/ui/button";
import {TypographyH1} from "@/components/ui/typography";
import {useRouter} from "next/navigation";
import {UndoIcon} from "lucide-react";
import useContestStore from "@/domain/useContestStore";


export default function AddContestThemes() {
    const router = useRouter()
    const {themes, setThemes} = useContestStore()

    function onSubmit() {
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
            {themes.map((theme, index) => (
                <Button variant={theme.selected ? 'secondary' : 'ghost'} onClick={() => toggleTheme(index)} size={'lg'}
                        key={index}>
                    <span className={"text-gray-800"}>{theme.name}</span>
                </Button>
            ))}
            <div className={"grid gap-2 text-center py-4"}>
                <Button type={"submit"} onClick={onSubmit} size={'lg'} variant={'default'}>Etape suivante</Button>
            </div>
        </>
    );
}