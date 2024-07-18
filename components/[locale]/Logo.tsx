import Image from "next/image";
import {TypographySmall} from "@/components/ui/typography";

export default function Logo(){
    return <div className={"flex flex-col"}>
        <Image src={'/carrot.ico'} alt={'logo'} width={48} height={48}/>
    <TypographySmall>Zester, créateur de concours photos.</TypographySmall>
</div>}
