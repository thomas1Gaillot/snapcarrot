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

export default function Layout({ children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    const [isLoading, setIsLoading] = useState(true);
    const {accessCode} = useParams();
    const router = useRouter();
    const {setContest} = useContestStore();


    useEffect(() => {
        if (accessCode) {
            fetchContestFromAccessCode();
        }
    }, [accessCode]);

    useEffect(() => {
        if (!accessCode) {
            router.push('/on-boarding/join-contest')
        }
    }, [accessCode])
    async function fetchContestFromAccessCode() {
        try {
            const contest = await axios.get(`/api/contest/find?accessCode=${accessCode}`)
            const themes = await axios.get(`/api/theme/${contest.data.id}/list`)
            const contestThemes: Theme[] = themes.data.map((theme: any) => ({
                id: theme.id,
                name: theme.name,
                icon: {
                    name: theme.icon,
                    jsx: lucideStringToIcon(theme.icon).iconJSX,
                },
                selected: true
            }))

            const contestData: Contest = {
                id: contest.data.id,
                title: contest.data.title,
                description: contest.data.description,
                endDate: contest.data.endDate,
                winner: contest.data.winner,
                themes: contestThemes,
                accessCode: contest.data.accessCode,
                status: contest.data.status,
                startDate: contest.data.startDate
            }
            setContest(contestData)
            setIsLoading(false)

        } catch (e: any) {
            if (e?.response?.status === 404) {
                toast({title: 'Aucun concours photo trouvé avec ce code.'})
            }
            console.error(e)
            setIsLoading(false)
        }
    }

    if(isLoading) {
        return <LoadingComponent />
    }

    return <>
        {children}
    </>

}
