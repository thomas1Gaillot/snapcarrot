import {Card} from "@/components/ui/card";
import {contestIcon} from "@/domain/status/Status";
import React from "react";
import Image from "next/image";

export default function EmptyContestLink({title, description}: {
    title: string,
    description: string
}) {

    return (
        <Card
            className="w-full max-w-3xl flex items-start gap-2 pr-4 py-1 border-none shadow-none rounded-none hover:shadow-none">
            <Image alt={'no-image'} src={contestIcon()}
                   width={64} height={64}
                   className="p-6 h-16 w-16 bg-secondary rounded flex items-center py-1"/>
            <div className="flex-1 grid">
                <h2 className={"font-medium"}>{title}</h2>
                <p className={"text-xs text-muted-foreground"}>{description}</p>
            </div>
        </Card>
    );
}
