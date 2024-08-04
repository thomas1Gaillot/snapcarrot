import {TypographySmall} from "@/components/ui/typography";
import {Progress} from "@/components/ui/progress";
import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function VotesProgress({numberOfVotes, totalVotes, loading}: {
    numberOfVotes: number,
    totalVotes: number,
    loading: boolean
}) {
    if(loading) return <VotesProgressSkeleton/>
    return <div className={'grid py-4 gap-1'}>
        <TypographySmall>
            <> {numberOfVotes} votes attribués sur {totalVotes}.</>
        </TypographySmall>
        <Progress value={(numberOfVotes / totalVotes) * 100}/>
    </div>
}

const VotesProgressSkeleton = () => <div className={'grid py-4 gap-1'}>
    <Skeleton className={'w-[100px] h-[12px] rounded'}/>
    <Progress value={0}/>
</div>