import {useState} from "react";
import {Contest, contestSchema} from "@/domain/contest/Contest";
import {apiClient} from "@/lib/axiosConfig";

export default function useUserContests() {
    const [myContests, setContests] = useState<Contest[]>([])
    const [userContestsLoading, setUserContestsLoading] = useState<boolean>(false)

    async function getMyContests(userId: string) {
        setUserContestsLoading(true)
        try {
            const response = await apiClient.get(`/api/contest/by-user-id/${userId}/list`)
            if (response.status === 200) {
                const contests = await response.data
                setContests(contests)
            }
        } catch (error) {
            console.error(error)
        }
        setUserContestsLoading(false)
    }

    return {getMyContests, myContests, userContestsLoading}
}


export async function getMyContests(userId?: string) {
    const response = await apiClient.get(`/api/contest/by-user-id/${userId}/list`)
    return response.data.map((contest: any) => contestSchema.parse(contest))
}