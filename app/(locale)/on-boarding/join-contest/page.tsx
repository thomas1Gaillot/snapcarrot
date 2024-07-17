'use client'
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {toast} from "@/components/hooks/use-toast";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";

const FormSchema = z.object({
    accessCode: z.string().min(6, {
        message: "Le code est incomplet.",
    }),
})

export default function JoinContestPage() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            accessCode: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }

    return <>
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
                                Entrez le code reçu par l'un de vos amis pour rejoindre un concours.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className={"w-full flex justify-end"}>
                    <Button type="submit">Rejoindre le concours</Button>
                </div>
            </form>
        </Form>

    </>
}