import {useEffect, useState} from "react";
import useContestStore from "@/domain/contest/useContestStore";
import {apiClient} from "@/lib/axiosConfig";

export default function useFetchNumberOfVotes() {
    const {id} = useContestStore();

    const [numberOfVotes, setNumberOfVotes] = useState(0);

    async function getNumberOfVotes() {
        try {
            const res = await apiClient.get(`/api/contest/${id}/number-of-votes`);
            setNumberOfVotes(res.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (id) {
            getNumberOfVotes();
        }
    }, [id]);

    return {
        numberOfVotes
    };
}
