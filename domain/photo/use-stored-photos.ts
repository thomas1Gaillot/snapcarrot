import { useEffect, useState } from "react";
import axios from "axios";
import useContestStore from "@/domain/contest/useContestStore";
import useUserStore from "@/domain/user/useUserStore";
import { Theme } from "@/domain/theme/Theme";
import { Photo } from "@/domain/photo/Photo";

export const useStoredPhotos = (selectedThemes: Theme[]) => {
    const { id } = useContestStore();
    const { user } = useUserStore();
    const [storedPhotos, setStoredPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        if (user && id) {
            fetchStoredPhotos();
        }
    }, [user, id]);

    const fetchStoredPhotos = async () => {
        try {
            if (!selectedThemes) return;
            const photosData = await Promise.all(
                selectedThemes.map(async (theme) => {
                    const response = await axios.get(`/api/photo/${user.id}/${id}/${theme.id}/list`);
                    if (response.data) {
                        return response.data;
                    }
                    return null;
                })
            );

            const photos = photosData.filter(photo => photo !== null) as Photo[];
            setStoredPhotos(photos);
        } catch (error) {
            console.error("Error fetching stored photos:", error);
        }
    };

    return { storedPhotos, setStoredPhotos };
};
