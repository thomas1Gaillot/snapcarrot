import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import useUserStore from "@/domain/user/useUserStore";
import {UserSchema, userSchema} from "@/domain/user/User";
import useCreateAccount from "@/domain/user/use-create-account";
import {z} from "zod";
import useRetrieveAccount from "@/domain/user/use-retrieve-account";
import {toast} from "@/components/hooks/use-toast";
import {useRouter} from "next/navigation";


export const emailSchema = z.object({
    email: z
        .string().min(1, {
            message: "L'email est requis."
        })
        .email({
            message: "L'email n'est pas valide."
        })
})
export type EmailSchema = z.infer<typeof emailSchema>

export default function RetrieveAccountDialog({openDialog, setOpenDialog}: {
    openDialog: boolean,
    setOpenDialog: (open: boolean) => void
}) {
    const {user} = useUserStore()
    const {retrieveAccount, isLoading} = useRetrieveAccount()
    const router = useRouter()

    const form = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: user.email,
        },
    })

    async function onRetrieveAccountSubmit(values: EmailSchema) {
        await retrieveAccount(values)
    }


    return <Drawer open={openDialog} onOpenChange={setOpenDialog}>
        <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                    <DrawerTitle>Bon retour chez nous</DrawerTitle>
                    <DrawerDescription>{"Entrez l'adresse e-mail que vous avez utilisé pour vous connecter la première fois."}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onRetrieveAccountSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>{'Adresse e-mail'}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="jean.dupont@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <DrawerFooter className={'grid grid-cols-2 gap-2'}>
                    <Button onClick={() => setOpenDialog(false)} variant="outline">Annuler</Button>
                    <Button loading={isLoading}
                            onClick={form.handleSubmit(onRetrieveAccountSubmit)}>Valider</Button>
                </DrawerFooter>
            </div>
        </DrawerContent>
    </Drawer>

}
