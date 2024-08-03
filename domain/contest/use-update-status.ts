import {apiClient} from "@/lib/axiosConfig";
import {Status} from "@/domain/status/Status";

export async function updateContestStatus(contestId: string, status: Status) {
    const response = await apiClient.post(`/api/contest/${contestId}/update-status`, {
        contestId,
        status
    });
    return response.data;
}