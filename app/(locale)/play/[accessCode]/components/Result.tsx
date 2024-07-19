'use client'
import {TypographyH4, TypographyP} from "@/components/ui/typography";

export default function ResultsPage() {


    return (
        <>
            <div className={"grid gap-1"}>
                <TypographyH4>Résultats</TypographyH4>
                <TypographyP>{'Lorsque tout les participants ont voté, vous pourrez découvrir le ou la meilleur(e) photographe !'}</TypographyP>
            </div>
        </>

    )
}
