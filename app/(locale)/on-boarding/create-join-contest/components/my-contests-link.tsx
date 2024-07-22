import useUserStore from "@/domain/user/useUserStore";
import useUserContests from "@/domain/contest/use-user-contests";
import {useEffect} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import ContestLink from "@/app/(locale)/on-boarding/create-join-contest/components/contest-link";
import {TypographyH4} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import EmptyContestLink from "@/app/(locale)/on-boarding/create-join-contest/components/empty-contest-link";
import {UserIcon} from "lucide-react";

const MyContestsLink = ({}) => {
    const {user} = useUserStore()
    const {getMyContests, myContests, userContestsLoading} = useUserContests()
    const router = useRouter();

    useEffect(() => {
        if (user.id) {
            getMyContests(user.id)
        }
    }, [user]);

    return <>

        <div className={"grid grid-cols-[40px,3fr,1fr] py-4"}>
            <div className={'p-1 bg-primary rounded-full w-min h-min text-primary-foreground'}>
                <UserIcon className={'size-5'}/>
            </div>
            <TypographyH4>{"Participations"}</TypographyH4>
            <Button variant={'secondary'} onClick={() => router.push('/on-boarding/join-contest')}>Rejoindre
                un concours</Button>
        </div>
        <span
            className={'leading-7 text-gray-800 text-sm'}>
            {"Cliquez sur l'un des concours pour continuer à jouer."}
        </span>

        {userContestsLoading && <>
            <Skeleton className={"w-48 h-6"}/>
            <div className={"grid gap-1 py-4"}>
                <Skeleton className={"w-32 h-4"}/>
                <Skeleton className={"w-24 h-3"}/>
            </div>
            <div className={"grid gap-2 py-4"}>
                <Skeleton className={"w-32 h-4"}/>
                <Skeleton className={"w-24 h-3"}/>
            </div>
        </>
        }
        {myContests.length === 0 && !userContestsLoading &&
            <EmptyContestLink title={'Aucun résultat'} description={"Vous n'avez pas participé à un concours."}/>}

        <div className={"grid gap-1 py-4"}>
            {myContests.map(contest =>
                <ContestLink key={contest.id} contest={contest}/>
            )}
        </div>
    </>
}
export default MyContestsLink
