import useUserStore from "@/domain/user/useUserStore";
import {useState} from "react";
import {Contest} from "@/domain/contest/Contest";

export default function useUserContests() {
    const [contests, setContests] = useState<Contest[]>([])
    async function getMyContests(userId : string) {
        const response = await fetch(`/api/user/${userId}/list-contests`)
        if (response.ok) {
            const contests = await response.json()
            setContests(contests)
        }
        return []
    }
    return {getMyContests, contests}
}
