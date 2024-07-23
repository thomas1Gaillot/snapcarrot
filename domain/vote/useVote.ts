import {useEffect, useState} from "react";
import axios from "axios";
import {Photo} from "@/domain/photo/Photo";
import useUserStore from "@/domain/user/useUserStore";


export default function useVote (themeId ?:string) {
    const {user} = useUserStore();
    const [vote, setVote] = useState<Photo | null>(null);

    useEffect(() => {
        if(themeId){
            fetchVote(themeId);
        }
    }, [themeId]);
    async function fetchVote(themeId: string) {
        try {
            const response = await axios.get(`/api/vote/get/${user.id}/${themeId}`);
            setVote(response.data);
        } catch (error) {
            console.error("Error fetching vote:", error
            );
        }
    }
    async function like(selectedPhoto: Photo) {
        try {
            const response = await axios.post("/api/vote/put", {
                themeId: selectedPhoto.themeId,
                userId: user.id,
                photoId: selectedPhoto.id,
                contestId: selectedPhoto.contestId
            });
            setVote(selectedPhoto);
            console.log("Vote successful:", response.data);
        } catch (error) {
            console.error("Error voting:", error);
        }
    }

    return {vote, like};
}
