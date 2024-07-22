import {Contest} from "@/domain/contest/Contest";
import {Card} from "@/components/ui/card";
import {KeyIcon, PlayIcon, SwatchBook} from "lucide-react";
import {useRouter} from "next/navigation";
import {contestIcon, getStatus} from "@/domain/status/Status";
import Image from "next/image";

export default function ContestLink({contest}: { contest: Contest }) {

    const router = useRouter();
    return <div className={"flex gap-1"}>
        <Card onClick={() => router.push(`/play/${contest.accessCode}`)}
              className="cursor-pointer  hover:bg-gray-50 w-full max-w-3xl flex items-start gap-2 pr-4 py-1 border-none shadow-none rounded-none hover:shadow-none">
            <Image alt={contest.id + '-image'} src={contestIcon(contest.status, true)}
                   width={64} height={64}
                   className="p-2 bg-secondary rounded flex items-center py-1"/>
            <div className="flex-1 grid ">
                <h2 className={'font-medium'}>{contest.title}</h2>
                <p className={"text-xs text-muted-foreground"}>{contest.description}</p>
            </div>
            <div className="grid gap-1 text-right">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <PlayIcon className="w-4 h-4"/> {getStatus(contest.status)}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground  ">
                    <SwatchBook className="w-4 h-4"/> {contest?.themes?.length || 'N/A'}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <KeyIcon className="w-4 h-4"/> {contest.accessCode}
                </div>
            </div>
        </Card>

    </div>
}
