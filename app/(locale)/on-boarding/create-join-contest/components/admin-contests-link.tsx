import useUserStore from "@/domain/user/useUserStore";
import {useRouter} from "next/navigation";
import useUserAdminContests from "@/domain/contest/use-user-admin-contests";
import {useEffect} from "react";
import {TypographyH4} from "@/components/ui/typography";
import {Skeleton} from "@/components/ui/skeleton";
import ContestLink from "@/app/(locale)/on-boarding/create-join-contest/components/contest-link";

const AdminContestsLink = ({}) => {
    const {user} = useUserStore()
    const {getAdminContests, adminContests, userAdminContestLoading} = useUserAdminContests()

    useEffect(() => {
        if (user.id) {
            getAdminContests(user.id)
        }
    }, [user]);

    return <>
        <div className={"grid gap-1 py-4"}>
            {adminContests.map(contest =>
                <ContestLink key={contest.id} contest={contest}/>
            )}

            {userAdminContestLoading && <>
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
        </div>
    </>
}
export default AdminContestsLink;
