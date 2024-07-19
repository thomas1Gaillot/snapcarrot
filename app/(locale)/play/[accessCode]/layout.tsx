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

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('open');
    const params = useParams();
    const accessCode = params ? params.accessCode : null;
    const router = useRouter();
    const {setContest} = useContestStore();
    const {title, description, themes, endDate} = useContestStore();

    useEffect(() => {
        if (!title || !description || !themes || !endDate) {
            router.push('/on-boarding/create-join-contest');
        }
    }, [title, description, themes, endDate]);

    useEffect(() => {
        if (accessCode) {
            fetchContestFromAccessCode();
        } else {
            router.push('/on-boarding/join-contest');
        }
    }, [accessCode]);

    useEffect(() => {
        const hash = window.location.hash.substring(1); // Remove the # character
        if (hash) {
            setActiveTab(hash);
        }
    }, []);

    useEffect(() => {
        window.location.hash = activeTab;
    }, [activeTab]);

    async function fetchContestFromAccessCode() {
        try {
            const contest = await axios.get(`/api/contest/find-by-access-code?accessCode=${accessCode}`);
            const themes = await axios.get(`/api/theme/${contest.data.id}/list`);
            const contestThemes: Theme[] = themes.data.map((theme: any) => ({
                id: theme.id,
                name: theme.name,
                icon: {
                    name: theme.icon,
                    jsx: lucideStringToIcon(theme.icon).iconJSX,
                },
                selected: true
            }));

            const contestData: Contest = {
                id: contest.data.id,
                title: contest.data.title,
                description: contest.data.description,
                endDate: contest.data.endDate,
                winner: contest.data.winner,
                themes: contestThemes,
                accessCode: contest.data.accessCode,
                status: Status.open,
                startDate: contest.data.startDate
            };
            setContest(contestData);
            setIsLoading(false);

        } catch (e: any) {
            if (e?.response?.status === 404) {
                toast({title: 'Aucun concours photo trouvé avec ce code.'});
            }
            console.error(e);
            setIsLoading(false);
        }
    }

    return <>
        <ContestHeader/>
        {isLoading ?
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <LoadingComponent/>
            </div> : <>{children}</>
        }

    </>

}
