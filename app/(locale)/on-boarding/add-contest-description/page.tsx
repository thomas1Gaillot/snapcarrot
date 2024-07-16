'use client'
import {Button} from "@/components/ui/button";
import {TypographyH1} from "@/components/ui/typography";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {UndoIcon} from "lucide-react";
import useContestStore from "@/domain/useContestStore";
import {Textarea} from "@/components/ui/textarea";

const formSchema = z.object({
    description: z.string().min(10, {
        message: "La description doit contenir au moins 10 caractères.",
    }),
})

export default function AddContestDescription() {
    const router = useRouter()
    const {description, setDescription} = useContestStore()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: description,
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setDescription(values.description)
        router.push('/on-boarding/add-contest-themes')
    }

    return (<>
            <Button className={'w-max'} onClick={() => router.push('/on-boarding/add-contest-title')}
                    variant={'secondary'}>
                <UndoIcon className={"text-gray-800 size-4"}/>
            </Button>
            <TypographyH1>{'Pourquoi faites-vous ce concours.'}</TypographyH1>
            <p className={"leading-7 text-gray-800"}>
                {"Expliquez en quelques mots pourquoi vous organisez ce concours."}
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Concours photos de fin d'année 2024" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <div className={"grid gap-2 text-center py-4"}>
                <Button type={"submit"} onClick={form.handleSubmit(onSubmit)} size={'lg'} variant={'default'}>Etape suivante</Button>
            </div>
        </>
    );
}