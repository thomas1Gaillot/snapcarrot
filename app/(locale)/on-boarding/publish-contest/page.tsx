'use client'
import {UndoIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import ContestCard from "@/app/(locale)/on-boarding/publish-contest/components/ContestCard";
import useUserStore from "@/domain/user/useUserStore";
import usePublishContest from "@/domain/contest/use-publish-contest";
import LoadingComponent from "@/components/[locale]/loading-component";


export default function PublishContestPage() {
    const router = useRouter()
    const {publishContest, isPublishContestLoading} = usePublishContest()
    const handlePublishContest = async () => {
        await publishContest()
        router.push('/on-boarding/published-successfully')
    }
    if(isPublishContestLoading) return <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <LoadingComponent/>
    </div>
    return <>
        <Button className={'w-max'} onClick={() => router.push('/on-boarding/add-contest-themes')}
                variant={'secondary'}>
            <UndoIcon className={"text-gray-800 size-4"}/>
        </Button>
        <ContestCard/>
        <Button size={'lg'} variant={'default'} onClick={handlePublishContest}>
            Publier !
        </Button>

    </>
}