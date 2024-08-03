import {Theme} from "@/domain/theme/Theme";
import axios from "axios";
import {Photo} from "@/domain/photo/Photo";

export const fetchAllStoredPhotos = async (themes: Theme[], contestId?: string) => {
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

    return photosData
};