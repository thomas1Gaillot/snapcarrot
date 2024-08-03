import {useEffect, useState} from "react";
import {apiClient} from "@/lib/axiosConfig";

export default function useGeneralStatsContest(id: string) {

    const [numberOfParticipants, setNumberOfParticipants] = useState('-');
    const [numberOfThemes, setNumberOfThemes] = useState('-');
    const [numberOfPhotos, setNumberOfPhotos] = useState('-');
    const [userAdminName, setUserAdminName] = useState('-');

    async function getGeneralStatsContest() {
        try {
            const res = await apiClient.get(`/api/contest/${id}/general-stats`);
            const {numberOfParticipants, numberOfThemes, numberOfPhotos, userAdminName} = res.data;

            setNumberOfParticipants(numberOfParticipants);
            setNumberOfThemes(numberOfThemes);
            setNumberOfPhotos(numberOfPhotos);
            setUserAdminName(userAdminName)
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
        userAdminName,
    };
}
