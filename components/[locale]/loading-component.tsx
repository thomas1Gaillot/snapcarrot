import Image from "next/image";
import {TypographyLead} from "@/components/ui/typography";

export default function LoadingComponent() {
    return <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="animate-bounce">
            <Image
                src="/carrot.ico" // Replace with your logo's path
                alt="Logo"
                width={100} // Set the width of your logo
                height={100} // Set the height of your logo
            />
        </div>
        <TypographyLead>Les carottes cuisent ...</TypographyLead>
    </div>
}
