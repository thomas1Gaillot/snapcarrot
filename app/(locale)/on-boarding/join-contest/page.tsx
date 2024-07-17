'use client'
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {toast} from "@/components/hooks/use-toast";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import {UndoIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import useJoinContest from "@/domain/contest/use-join-contest";

const FormSchema = z.object({
    accessCode: z.string().min(6, {
        message: "Le code est incomplet.",
    }),
})

export default function JoinContestPage() {
    const router = useRouter()
    const {findContest, fetchThemesIsLoading}=  useJoinContest()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            accessCode: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
       await findContest(data.accessCode)
    }

    return <>
        <Button className={'w-max'} onClick={() => router.push('/on-boarding/create-join-contest')} variant={'secondary'}>
            <UndoIcon className={"text-gray-800 size-4"} />
        </Button>
        <TypographyH1>Rejoindre un concours</TypographyH1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="accessCode"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{'Code d\'accès à un concours'}</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0}/>
                                        <InputOTPSlot index={1}/>
                                        <InputOTPSlot index={2}/>
                                    </InputOTPGroup>
                                    <InputOTPSeparator/>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3}/>
                                        <InputOTPSlot index={4}/>
                                        <InputOTPSlot index={5}/>
                                    </InputOTPGroup>
                                </InputOTP>

                            </FormControl>
                            <FormDescription>
                                {"Entrez le code que l'on vous a partagé pour rejoindre un concours."}
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className={"w-full flex justify-end"}>
                    <Button loading={fetchThemesIsLoading} type="submit">Rejoindre le concours</Button>
                </div>
            </form>
        </Form>

    </>
}