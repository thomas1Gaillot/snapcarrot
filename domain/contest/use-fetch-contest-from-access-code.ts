import {useState} from "react";
import axios from "axios";
import {Theme} from "@/domain/theme/Theme";
import {lucideStringToIcon} from "@/domain/theme/utils";
import {Contest} from "@/domain/contest/Contest";
import {Status} from "@/domain/status/Status";
import {toast} from "@/components/hooks/use-toast";
import useContestStore from "@/domain/contest/useContestStore";

export default function useFetchContestFromAccessCode() {
    const [isFetchingContest, setIsFetchingContest] = useState(true);
    const {setContest} = useContestStore();

    async function fetchContestFromAccessCode(accessCode:string) {
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
                status: contest.data.status,
                startDate: contest.data.startDate,
                adminUser : contest.data.user
            };
            setContest(contestData);
            setIsFetchingContest(false);

        } catch (e: any) {
            if (e?.response?.status === 404) {
                toast({title: 'Aucun concours photo trouvé avec ce code.'});
            }
            console.error(e);
            setIsFetchingContest(false);
        }
    }


    return {isFetchingContest, fetchContestFromAccessCode}
}
