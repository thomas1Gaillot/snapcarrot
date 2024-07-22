import useUserStore from "@/domain/user/useUserStore";
import {useRouter} from "next/navigation";
import useUserAdminContests from "@/domain/contest/use-user-admin-contests";
import {useEffect} from "react";
import {TypographyH4, TypographyP} from "@/components/ui/typography";
import {Skeleton} from "@/components/ui/skeleton";
import ContestLink from "@/app/(locale)/on-boarding/create-join-contest/components/contest-link";
import {Button} from "@/components/ui/button";
import {KeyIcon, PlayIcon, SwatchBook, UserIcon} from "lucide-react";
import {getStatus} from "@/domain/status/Status";
import {Card} from "@/components/ui/card";
import EmptyContestLink from "@/app/(locale)/on-boarding/create-join-contest/components/empty-contest-link";

const AdminContestsLink = ({}) => {
    const {user} = useUserStore()
    const {getAdminContests, adminContests, userAdminContestLoading} = useUserAdminContests()
    const router = useRouter();

    useEffect(() => {
        if (user.id) {
            getAdminContests(user.id)
        }
    }, [user]);

    return <>
        <div className={"grid grid-cols-[40px,3fr,1fr] py-4"}>
            <div className={'p-1 bg-primary rounded-full w-min h-min text-primary-foreground'}>
                <UserIcon className={'size-5'}/>
            </div>
            <TypographyH4>{"Concours créés"}</TypographyH4>
            <Button onClick={() => router.push('/on-boarding/add-contest-title')} variant={'default'}>Créer
                un concours</Button>
        </div>
        <span
            className={'leading-7 text-gray-800 text-sm'}>{"Retrouvez les concours que vous avez créés. Cliquer sur l'un des concours pour gérer son statut et voir son avancement."}</span>
        <div className={"grid gap-2 py-4"}>
            {adminContests.map(contest =>
                <ContestLink key={contest.id} contest={contest}/>
            )}
            {adminContests.length === 0 && !userAdminContestLoading &&  <EmptyContestLink title={'Aucun résultat'} description={"Vous n'avez pas encore créé de concours."}/>}

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