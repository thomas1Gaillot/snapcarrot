import {Button} from "@/components/ui/button";
import Image from "next/image";
import {TypographyH1, TypographyP} from "@/components/ui/typography";

export default function StartwithUsernamePage() {
    return (<>
        <div className={"h-full flex flex-col justify-center gap-2"}>
            <Image src={'/carrot.ico'} alt={'logo'} width={48} height={48}/>
            <TypographyH1>Commencer</TypographyH1>
            <TypographyP>
                {"Pour commencer, choisissez un nom d'utilisateur."}
            </TypographyP>
        </div>
            <div className={"grid gap-2"}>
                <Button variant={'default'}>Start</Button>

            </div>
        </>
    );
}