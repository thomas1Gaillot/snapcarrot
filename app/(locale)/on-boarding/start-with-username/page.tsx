'use client'
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {TypographyH1, TypographyP, TypographySmall} from "@/components/ui/typography";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useUserStore from "@/domain/user/useUserStore";
import {useRouter} from "next/navigation";
import Logo from "@/components/[locale]/Logo";
import {useEffect} from "react";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Le nom de jeu doit contenir au moins 2 caractères.",
    }),
})

export default function StartwithUsernamePage() {
    const {user, setUser}= useUserStore()
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name,
        },
    })
    useEffect(() => {
        form.setValue('name', user.name)
    },[user.name])

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setUser({...user, name : values.name})
        router.push('/on-boarding/create-join-contest')
    }

    return (<>
            <Logo/>
            <TypographyH1>Bienvenue sur Zester</TypographyH1>
            <p className={"leading-7 text-gray-800"}>
                {"Pour commencer, choisissez un nom d'utilisateur."}
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Choisissez un nom ou pseudo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <div className={"grid gap-2 text-center py-4"}>
                <Button type={"submit"} onClick={form.handleSubmit(onSubmit)} size={'lg'} variant={'default'}>Commencer</Button>
                <TypographySmall>Cette application est gratuite. Les photos que vous importez seront supprimés après chaque concours.</TypographySmall>
            </div>
        </>
    );
}
