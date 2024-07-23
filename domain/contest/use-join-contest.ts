import {useState} from "react";
import axios from "axios";
import {toast} from "@/components/hooks/use-toast";
import {useRouter} from "next/navigation";
import useContestStore from "@/domain/contest/useContestStore";
import {Contest} from "@/domain/contest/Contest";
import {lucideStringToIcon} from "@/domain/theme/utils";
import {Theme} from "@/domain/theme/Theme";
import {Status} from "@/domain/status/Status";
import {apiClient} from "@/lib/axiosConfig";

export default function useJoinContest() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const {setContest} = useContestStore()

    async function findContest(accessCode: string) {
        try {
            setIsLoading(true)
            const contest = await apiClient.get(`/api/contest/find-by-access-code?accessCode=${accessCode}`)

            const themes = await apiClient.get(`/api/theme/${contest.data.id}/list`)
            const contestThemes:Theme[] = themes.data.map((theme: any) => ({
                id: theme.id,
                name: theme.name,
                icon: {
                    name: theme.icon,
                    jsx: lucideStringToIcon(theme.icon).iconJSX,
                },
                selected : true
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
                startDate: contest.data.startDate,
                adminUser : contest.data.user
            }
            setContest(contestData)
            router.push(`/play/${contest.data.accessCode}/`)

            setIsLoading(false)
        } catch (e: any) {
            if (e?.response?.status === 404) {
                toast({title: 'Aucun concours photo trouvé avec ce code.'})
            }
            console.error(e)
            setIsLoading(false)
        }
    }

    return {fetchThemesIsLoading: isLoading, findContest}
}
