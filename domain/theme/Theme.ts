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
    icon: {
        jsx ?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
        name: string
    };
    selected: boolean;
}

export const defaultThemes: Theme[] = [
    {name: "Printemps", selected: false, icon: {jsx: FlowerIcon, name: "FlowerIcon"}},
    {name: "Ete", selected: false, icon: {jsx: SunIcon, name: "SunIcon"}},
    {name: "Automne", selected: false, icon: {jsx: LeafIcon, name: "LeafIcon"}},
    {name: "Hiver", selected: false, icon: {jsx: SnowflakeIcon, name: "SnowflakeIcon"}},
    {name: "Insolite", selected: false, icon: {jsx: RollerCoasterIcon, name: "RollerCoasterIcon"}},
    {name: "Main verte", selected: false, icon: {jsx: VeganIcon, name: "VeganIcon"}},
    {name: "Fait-maison", selected: false, icon: {jsx: HandCoinsIcon, name: "HandCoinsIcon"}},
    {name: "Pâques", selected: false, icon: {jsx: EggIcon, name: "EggIcon"}},
]