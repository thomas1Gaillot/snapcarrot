import {contestSchema} from "@/domain/contest/Contest";
import {apiClient} from "@/lib/axiosConfig";


export async function getMyContests(userId?: string) {
    const response = await apiClient.get(`/api/contest/by-user-id/${userId}/list`)
    return response.data.map((contest: any) => contestSchema.parse(contest))
}