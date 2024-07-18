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


export default function CreateAccountDrawer({openDrawer, setOpenDrawer}: {
    openDrawer: boolean,
    setOpenDrawer: (open: boolean) => void
}) {
    const {user} = useUserStore()
    const {createAccount, isCreateAccountLoading} = useCreateAccount()

    const form = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    })

    async function onCreateAccountSubmit(values: UserSchema) {
        await createAccount(values)
        setOpenDrawer(false)
    }


    return <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                    <DrawerTitle>Créer un compte</DrawerTitle>
                    <DrawerDescription>Crééz votre compte pour pouvoir gérer le concours que vous
                        publiez.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onCreateAccountSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>{'Nom d\'utilisateur'}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Jean Dupont" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type={'email'}
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
                    <Button onClick={() => setOpenDrawer(false)} variant="outline">Annuler</Button>
                    <Button loading={isCreateAccountLoading}
                            onClick={form.handleSubmit(onCreateAccountSubmit)}>Valider</Button>
                </DrawerFooter>
            </div>
        </DrawerContent>
    </Drawer>

}