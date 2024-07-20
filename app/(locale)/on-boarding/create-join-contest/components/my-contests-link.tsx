import useUserStore from "@/domain/user/useUserStore";
import {useRouter} from "next/navigation";
import useUserContests from "@/domain/contest/use-user-contests";
import {useEffect} from "react";
import {TypographyH4, TypographySmall} from "@/components/ui/typography";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "lucide-react";
import ContestLink from "@/app/(locale)/on-boarding/create-join-contest/components/contest-link";

const MyContestsLink = ({}) => {
    const {user} = useUserStore()
    const router = useRouter()
    const {getMyContests, myContests, userContestsLoading} = useUserContests()

    useEffect(() => {
        if (user.id) {
            getMyContests(user.id)
        }
    }, [user]);

    return <>
        {myContests.length > 0 && <TypographyH4>{`Mes participations`}</TypographyH4>}
        {userContestsLoading && <>
            <Skeleton className={"w-48 h-6"}/>
            <div className={"grid gap-1 py-4"}>
                <Skeleton className={"w-32 h-4"}/>
                <Skeleton className={"w-24 h-3"}/>
            </div>
            <div className={"grid gap-1 py-4"}>
                <Skeleton className={"w-32 h-4"}/>
                <Skeleton className={"w-24 h-3"}/>
            </div>
        </>
        }
        <div className={"grid gap-1 py-4"}>
            {myContests.map(contest =>
                <ContestLink key={contest.id} contest={contest}/>
            )}
        </div>
    </>
}
export default MyContestsLink
