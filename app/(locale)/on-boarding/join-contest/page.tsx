'use client'
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {TypographyH1} from "@/components/ui/typography";
import {UndoIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {fetchContest} from "@/domain/contest/fetch-contest";
import {useState} from "react";

const FormSchema = z.object({
    accessCode: z.string().min(6, {
        message: "Le code est incomplet.",
    }),
})

export default function JoinContestPage() {
    const [isEnabled, setIsEnabled] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            accessCode: "",
        },
    })
    const {data, isLoading} = useQuery({
        queryKey: ["contest", form.getValues().accessCode],
        enabled: isEnabled,
        queryFn: () => fetchContest(form.getValues().accessCode).then((contest) => {
            router.push(`/play/${contest?.accessCode}/`)
        })
    })


    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if(data.accessCode.length !== 6) return;
        setIsEnabled(true)
    }

    return <>
        <Button className={'w-max'} onClick={() => router.push('/on-boarding/create-join-contest')}
                variant={'secondary'}>
            <UndoIcon className={"text-gray-800 size-4"}/>
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
                    <Button loading={isLoading} type="submit">Rejoindre le concours</Button>
                </div>
            </form>
        </Form>

    </>
}