import {TypographyH4} from "@/components/ui/typography";
import EmptyContestLink from "@/app/(locale)/on-boarding/create-join-contest/components/empty-contest-link";
import {UserIcon} from "lucide-react";

const FinishedContestLink = ({}) => {
    const finishedContests = []


    return <>
        <div className={"grid grid-cols-[40px,3fr] py-4"}>
            <div className={'p-1 bg-primary rounded-full w-min h-min text-primary-foreground'}>
                <UserIcon className={'size-5'}/>
            </div>
            <TypographyH4>{"Concours terminés"}</TypographyH4>
        </div>
        <span className={'leading-7 text-gray-800 text-sm'}>{"Retrouvez les concours terminés et vos résultats."}</span>
        <div className={"grid gap-2 py-4"}>
            {finishedContests.length === 0 && <EmptyContestLink title={'Aucun résultat'}
                                                                description={"Vous n'avez pas encore de concours qui se sont terminés."}/>}
        </div>
    </>
}
export default FinishedContestLink;