import { useEffect, useState } from "react";
import axios from "axios";
import { Theme } from "@/domain/theme/Theme";
import { Photo } from "@/domain/photo/Photo";

export const useAllStoredPhotos = (contestId: string, themes: Theme[]) => {
    const [storedPhotos, setStoredPhotos] = useState<Photo[][]>([]);
    const [loaded, setLoaded] = useState(false); // État pour suivre si les données ont été chargées

    useEffect(() => {
        if (contestId && themes.length > 0 && !loaded) {
            fetchAllStoredPhotos();
        }
    }, [contestId, themes, loaded]);

    const fetchAllStoredPhotos = async () => {
        try {
            const photosData = await Promise.all(
                themes.map(async (theme) => {
                    const response = await axios.get(`/api/photo/contest/${contestId}/theme/${theme.id}/list`);
                    if (response.data && response.data.length > 0) {
                        const signedUrls = await Promise.all(
                            response.data.map(async (photo: Photo) => {
                                const signedUrlRes = await axios.post("/api/photo/signed-url", {
                                    path: photo.path
                                });
                                if (signedUrlRes.data) {
                                    return {
                                        ...photo,
                                        path: signedUrlRes.data.signedUrl,
                                    };
                                }
                                return photo;
                            })
                        );
                        return signedUrls;
                    }
                    return [];
                })
            );

            setStoredPhotos(photosData);
            setLoaded(true); // Marquer les données comme chargées après la récupération
        } catch (error) {
            console.error("Error fetching stored photos:", error);
        }
    };

    return { storedPhotos, setStoredPhotos, photosLoading : !loaded };
};
