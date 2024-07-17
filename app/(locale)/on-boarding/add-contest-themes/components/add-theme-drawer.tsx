import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import useContestStore from "@/domain/contest/useContestStore";
import {IconRenderer, lucideStringToIcon} from "@/domain/theme/utils";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Le nom de jeu doit contenir au moins 2 caractères.",
    }),
    icon: z.string()
})
export default function AddThemeDrawer() {
    const {themes, setThemes} = useContestStore()

    const [openDrawer, setOpenDrawer] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            icon: 'SwatchBookIcon'
        },
    })

    function onAddThemeSubmit(values: z.infer<typeof formSchema>) {
        setThemes([...themes, {
            name: values.name, icon: {
                name: values.icon,
                jsx: lucideStringToIcon(values.icon).iconJSX
            }, selected: true
        }])
        setOpenDrawer(false)
    }


    return <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerTrigger asChild>
            <Button className={"h-12"} variant={'ghost'}>
                <div className={"flex gap-2 items-center"}>
                    <PlusIcon/>
                    <span className={"text-gray-800 "}>
                                    Ajouter un thème
                                </span>
                </div>
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                    <DrawerTitle>Ajouter un thème</DrawerTitle>
                    <DrawerDescription>Crééz votre thème et associez une icône</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onAddThemeSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="ex: Famille, Création artistique" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="icon"
                                render={({field}) => (
                                    <FormItem className={'w-max'}>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <div className={'grid grid-cols-2 gap-2 items-center'}>
                                                    <FormLabel>Associez une icône</FormLabel>
                                                    <SelectTrigger>

                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                </div>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem
                                                    value="SwatchBookIcon">
                                                    <IconRenderer iconName={'SwatchBookIcon'}/>
                                                </SelectItem>
                                                <SelectItem
                                                    value="CookingPotIcon">
                                                    <IconRenderer iconName={'CookingPot'}/>
                                                </SelectItem>
                                                <SelectItem
                                                    value="SmileIcon">
                                                    <IconRenderer iconName={'SmileIcon'}/>
                                                </SelectItem>
                                                <SelectItem
                                                    value="FerrisWheelIcon">
                                                    <IconRenderer iconName={'FerrisWheelIcon'}/>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <DrawerFooter className={'grid grid-cols-2 gap-2'}>
                    <Button onClick={() => setOpenDrawer(false)} variant="outline">Annuler</Button>
                    <Button onClick={form.handleSubmit(onAddThemeSubmit)}>Valider</Button>
                </DrawerFooter>
            </div>
        </DrawerContent>
    </Drawer>

}