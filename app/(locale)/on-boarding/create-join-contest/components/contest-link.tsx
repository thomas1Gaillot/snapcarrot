import {Contest} from "@/domain/contest/Contest";
import {Card} from "@/components/ui/card";
import {KeyIcon, PlayIcon, SwatchBook} from "lucide-react";
import {useRouter} from "next/navigation";
import {getStatus} from "@/domain/status/Status";

export default function ContestLink({contest}: { contest: Contest }) {

    const router = useRouter();

    return <Card onClick={() => router.push(`/play/${contest.accessCode}`)}
                 className="cursor-pointer hover:bg-gray-50 w-full max-w-3xl flex items-start gap-2 px-4 py-2 border-none shadow-none hover:shadow-none rounded-none">
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
}
