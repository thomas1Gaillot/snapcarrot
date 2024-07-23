'use client'
import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import {useEffect, useState} from "react";
import {Theme} from "@/domain/theme/Theme";
import {lucideStringToIcon} from "@/domain/theme/utils";
import {Contest} from "@/domain/contest/Contest";
import useContestStore from "@/domain/contest/useContestStore";
import {toast} from "@/components/hooks/use-toast";
import LoadingComponent from "@/components/[locale]/loading-component";
import {Status} from "@/domain/status/Status";
import ContestHeader from "@/app/(locale)/play/[accessCode]/components/ContestHeader";
import useFetchContestFromAccessCode from "@/domain/contest/use-fetch-contest-from-access-code";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    const params = useParams();
    const accessCode = params ? params.accessCode : null;
    const router = useRouter();
    const {title, description, themes, endDate} = useContestStore();
    const {fetchContestFromAccessCode, isFetchingContest} = useFetchContestFromAccessCode();

    useEffect(() => {
        if (accessCode) {
            fetchContestFromAccessCode(accessCode as string);
        } else {
            router.push('/on-boarding/join-contest');
        }
    }, [accessCode]);

    useEffect(() => {
        if(isFetchingContest) return;
        
        if (!title || !description || !themes || !endDate) {
            console.log('Contest not found', title, description, themes, endDate);
            router.push('/on-boarding/create-join-contest');
        }
    }, [title, description, themes, endDate, isFetchingContest]);


    return <>
        <ContestHeader/>
        {isFetchingContest ?
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <LoadingComponent/>
            </div> : <>{children}</>
        }

    </>

}
