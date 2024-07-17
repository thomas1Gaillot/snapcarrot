'use client'
import useContestStore from "@/domain/contest/useContestStore";
import {TypographyH1, TypographyP} from "@/components/ui/typography";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {Button} from "@/components/ui/button";

export default function Page() {
    const {title, accessCode} = useContestStore()
    console.log(accessCode)
    return (
        <>
            <TypographyH1>Publication Réussie !</TypographyH1>
            <TypographyP><>Le concours : {title} a été publié avec succès ! </></TypographyP>
            <TypographyP>Partagez le code suivant à vos amis et famille pour pouvoir participer, sans créer de compte !</TypographyP>
            <InputOTP value={accessCode} maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <Button variant={'default'}>Partager</Button>
        </>
    )
}