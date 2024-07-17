import {
    EggIcon,
    FlowerIcon,
    HandCoinsIcon,
    LeafIcon,
    LucideProps,
    RollerCoasterIcon,
    SnowflakeIcon,
    SunIcon,
    VeganIcon
} from "lucide-react";
import {ForwardRefExoticComponent, RefAttributes} from "react";

export type Theme = {
    name: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    selected: boolean;
}
export const defaultThemes: Theme[] = [
    {name: "Printemps", selected: false, icon: FlowerIcon},
    {name: "Ete", selected: false, icon: SunIcon},
    {name: "Automne", selected: false, icon: LeafIcon},
    {name: "Hiver", selected: false, icon: SnowflakeIcon},
    {name: "Insolite", selected: false, icon: RollerCoasterIcon},
    {name: "Main verte", selected: false, icon: VeganIcon},
    {name: "Fait-maison", selected: false, icon: HandCoinsIcon},
    {name: "Pâques", selected: false, icon: EggIcon},
]