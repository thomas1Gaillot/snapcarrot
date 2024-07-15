'use client'
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {TypographyH1, TypographyP, TypographySmall} from "@/components/ui/typography";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useUserStore from "@/domain/useUserStore";
import {useRouter} from "next/navigation";
import Logo from "@/components/[locale]/Logo";
import {UndoIcon} from "lucide-react";
import useContestStore from "@/domain/useContestStore";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Le titre doit contenir au moins 2 caractères.",
    }),
})

export default function AddContestTitle() {
    const router = useRouter()
    const {title, setTitle} = useContestStore()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: title,
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setTitle(values.title)
        router.push('/on-boarding/add-contest-description')
    }

    return (<>
            <Button className={'w-max'} onClick={() => router.push('/on-boarding/create-join-contest')} variant={'secondary'}>
                <UndoIcon className={"text-gray-800 size-4"} />
            </Button>
            <TypographyH1>{'Le titre de mon concours'}</TypographyH1>
            <p className={"leading-7 text-gray-800"}>
                {"Commençons votre concours avec un petit titre."}
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Meilleures photos de l'année" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <div className={"grid gap-2 text-center py-4"}>
                <Button type={"submit"} onClick={form.handleSubmit(onSubmit)} size={'lg'} variant={'default'}>Je valide ce titre !</Button>
            </div>
        </>
    );
}