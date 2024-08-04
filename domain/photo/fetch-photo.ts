import axios from "axios";
import {Photo} from "@/domain/photo/Photo";

// Define the fetch function to retrieve a photo by photoId
export const fetchPhoto = async (photoId: number): Promise<Photo | null> => {
    // Fetch the photo details by photoId
    const response = await axios.get(`/api/photo/by-photo-id/${photoId}`);

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
    return null;
};
