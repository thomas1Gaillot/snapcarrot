import {DrillIcon} from "lucide-react";
import Logo from "@/components/[locale]/Logo";

export default function InConstruction() {
    return <div className={"h-full w-full justify-center items-center flex "}>
        <DrillIcon className={"w-6 h-6 text-primary mr-2"}/>
        <p className={"text-gray-800 "}>Page en cours de construction...</p>
    </div>
}