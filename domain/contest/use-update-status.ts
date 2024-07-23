import { useState } from "react";
import { apiClient } from "@/lib/axiosConfig";
import { Status } from "@/domain/status/Status";

export default function useUpdateContestStatus() {
    const [isLoading, setIsLoading] = useState(false);

    async function updateContestStatus(contestId: string, status: Status) {
        setIsLoading(true);
        try {
            const response = await apiClient.post(`/api/contest/${contestId}/update-status`, {
                contestId,
                status
            });
            return response.data;
        } catch (error) {
            console.error('Error updating contest status:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return { isUpdatingContestStatus: isLoading, updateContestStatus };
}
