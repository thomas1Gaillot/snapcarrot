import Image from "next/image";
import {TypographyLead} from "@/components/ui/typography";

export default function LoadingComponent({text}: { text?: string }) {
    return <>
        <div className="animate-bounce">
            <Image
                src="/carrot.ico" // Replace with your logo's path
                alt="Logo"
                width={100} // Set the width of your logo
                height={100} // Set the height of your logo
            />
        </div>
        <TypographyLead>{text ? text : 'Les carottes cuisent ...'}</TypographyLead>
    </>
}
