import {ForwardRefExoticComponent, RefAttributes} from "react";
import {LucideProps} from "lucide-react";

export function lucideStringToIcon(icon: string) {
    const Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> = require("lucide-react")[icon];
    return {
        icon: Icon.name,
        iconJSX: Icon
    }
}

const IconRenderer: React.FC<{ iconName: string }> = ({ iconName }) => {
    const { iconJSX: Icon } = lucideStringToIcon(iconName);

    if (!Icon) {
        return <span>Icon not found</span>; // Handle case where icon is not found
    }

    return <Icon />;
};

export {IconRenderer}