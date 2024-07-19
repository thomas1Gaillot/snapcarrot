import {useEffect, useState} from "react";
import useContestStore from "@/domain/contest/useContestStore";
import axios from "axios";

export default function useGeneralStatsContest() {
    const {id} = useContestStore();

    const [numberOfParticipants, setNumberOfParticipants] = useState(0);
    const [numberOfThemes, setNumberOfThemes] = useState(0);
    const [numberOfPhotos, setNumberOfPhotos] = useState(0);

    async function getGeneralStatsContest() {
        try {
            const res = await axios.get(`/api/contest/${id}/general-stats`);
            const {numberOfParticipants, numberOfThemes, numberOfPhotos} = res.data;

            setNumberOfParticipants(numberOfParticipants);
            setNumberOfThemes(numberOfThemes);
            setNumberOfPhotos(numberOfPhotos);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (id) {
            getGeneralStatsContest();
        }
    }, [id]);

    return {
        numberOfParticipants,
        numberOfThemes,
        numberOfPhotos,
    };
}
