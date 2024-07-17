'use client'
import {UndoIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import ContestCard from "@/app/(locale)/on-boarding/publish-contest/components/ContestCard";
import CreateAccountDrawer from "@/app/(locale)/on-boarding/publish-contest/components/create-account-drawer";
import {useState} from "react";
import useUserStore from "@/domain/user/useUserStore";
import usePublishContest from "@/domain/contest/use-publish-contest";
import useContestStore from "@/domain/contest/useContestStore";


export default function PublishContestPage() {
    const [openDrawer, setOpenDrawer] = useState(false)
    const router = useRouter()
    const {user} = useUserStore()
    const {publishContest, isPublishContestLoading} = usePublishContest()
    const handlePublishContest = async () => {
        if(!user?.id){
            setOpenDrawer(true)
        } else {
            await publishContest()
            router.push('/on-boarding/published-successfully')
        }
    }

    return <>
        <Button className={'w-max'} onClick={() => router.push('/on-boarding/add-contest-themes')}
                variant={'secondary'}>
            <UndoIcon className={"text-gray-800 size-4"}/>
        </Button>
        <ContestCard/>
        <Button loading={isPublishContestLoading} size={'lg'} variant={'default'} onClick={handlePublishContest}>
            Publier !
        </Button>
        <CreateAccountDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
    </>
}