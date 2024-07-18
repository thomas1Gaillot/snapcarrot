import { useState } from "react";
import axios from "axios";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3client";
import { Photo } from "@/domain/photo/Photo";
import { Theme } from "@/domain/theme/Theme";

interface UseUploadPhotoProps {
    userId: string;
    contestId: string;
    setStoredPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
}

export const useUploadPhoto = ({ userId, contestId, setStoredPhotos }: UseUploadPhotoProps) => {
    const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

    const uploadPhoto = async (theme: Theme, file: File) => {
        console.log("uploadPhoto", theme, file)
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

        setUploading((prev) => ({ ...prev, [theme.id!]: true }));

        try {
            const filePath = `photos/${Date.now()}_${file.name}`;
            const command = new PutObjectCommand({
                Bucket: process.env.NEXT_PUBLIC_SUPABASE_S3_NAME,
                Key: filePath,
                Body: file,
                ACL: "public-read",
            });
            await s3Client.send(command);

            // const  res= await axios.post("/api/photo/signed-url", {
            //     path: filePath,
            //     bucket: process.env.NEXT_PUBLIC_SUPABASE_S3_NAME,
            // });

            //const url = res.data.signedUrl;
            const oldWorkingUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/s3/${process.env.NEXT_PUBLIC_SUPABASE_S3_NAME}/${filePath}`;

            const response = await axios.post("/api/photo/add", {
                url:oldWorkingUrl,
                themeId: theme.id,
                contestId: contestId,
                userId: userId,
            });

            alert(`File for theme ${theme.name} uploaded successfully`);

            const newPhoto: Photo = response.data;

            setStoredPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert(`Error uploading file for theme ${theme.name}`);
        } finally {
            setUploading((prev) => ({ ...prev, [theme.id!]: false }));
        }
    };

    return { uploadPhoto, uploading };
};
