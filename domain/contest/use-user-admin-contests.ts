import {useState} from "react";
import {Contest} from "@/domain/contest/Contest";

export default function useUserAdminContests() {
    const [adminContests, setContests] = useState<Contest[]>([])
    const [userAdminContestLoading, setUserAdminContestLoading] = useState<boolean>(false)
    async function getAdminContests(userId: string) {
        setUserAdminContestLoading(true)
        const response = await fetch(`/api/user/${userId}/list-contests`)
        if (response.ok) {
            const contests = await response.json()
            setContests(contests)
        }
        setUserAdminContestLoading(false)
        return []
    }

    return {getAdminContests, adminContests, userAdminContestLoading}
}
