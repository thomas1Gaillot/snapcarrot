import axios from "axios";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3client";
import {Photo} from "@/domain/photo/Photo";
import {Theme} from "@/domain/theme/Theme";

interface UseUploadPhotoProps {
    userId: string;
    contestId: string;
    theme: Theme;
    file: File
}

export async function uploadPhoto({userId, contestId, theme, file}: UseUploadPhotoProps) {
    if (!file) {
        alert(`Veuillez sélectionner un fichier pour le thème ${theme.name}`);
        return;
    }
    if (!userId) {
        alert("Veuillez vous connecter pour participer");
        return;
    }
    if (!contestId) {
        alert("Concours non trouvé");
        return;
    }
    if (!theme.id) {
        alert("Thème non trouvé");
        return;
    }

    const filePath = `photos/${Date.now()}_${file.name}`;
    const command = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_SUPABASE_S3_NAME,
        Key: filePath,
        Body: file,
        ACL: "public-read",
    });
    await s3Client.send(command);
    const unsignedUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/sign/${process.env.NEXT_PUBLIC_SUPABASE_S3_NAME}/${filePath}`;

    //Demande de l'URL signée
    const res = await axios.post("/api/photo/signed-url", {
        path: filePath,
    });

    const signedUrl = res.data.signedUrl;

    const response = await axios.post("/api/photo/add", {
        path: filePath,
        themeId: theme.id,
        contestId: contestId,
        userId: userId,
    });


    const newPhoto: Photo = {path: signedUrl, ...response.data};
    return newPhoto
};
