'use client'
import {TypographyH4, TypographyP} from "@/components/ui/typography";

export default function VotePage() {


    return (
        <>
            <div className={"grid gap-1"}>
                <TypographyH4>Phase de vote</TypographyH4>
                <TypographyP>{'Lorsque tout les participants ont publié leurs photos, chacun peut voter pour la meilleure photo de chaque thème.'}</TypographyP>
            </div>

        </>

    )
}
