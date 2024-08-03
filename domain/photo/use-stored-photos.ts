import axios from "axios";
import {Photo} from "@/domain/photo/Photo";
import {User} from "@/domain/user/User";
import {Theme} from "@/domain/theme/Theme";


// Define the fetch function to retrieve stored photos
export const fetchStoredPhotos = async (user: User, contestId: string, selectedThemes: Theme[]): Promise<Photo[]> => {
    if (!user || !contestId || selectedThemes.length === 0) return [];

    const photosData = await Promise.all(
        selectedThemes.map(async (theme) => {
            try {
                // Fetch the list of photos for a theme
                const response = await axios.get(`/api/photo/${user.id}/${contestId}/${theme.id}/list`);

                if (response.data) {
                    // Fetch the signed URL for the photo
                    const signedUrlRes = await axios.post("/api/photo/signed-url", {
                        path: response.data.path,
                    });

                    if (signedUrlRes.data) {
                        const signedUrl = signedUrlRes.data.signedUrl;
                        return {
                            ...response.data,
                            path: signedUrl,
                        };
                    }
                }
            } catch (error) {
                console.error(`Error fetching photo for theme ${theme.id}:`, error);
            }
            return null;
        })
    );

    return photosData.filter((photo) => photo !== null) as Photo[];
};
