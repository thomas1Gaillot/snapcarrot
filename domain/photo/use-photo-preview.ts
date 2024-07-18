import { useState } from "react";

export const usePhotoPreviews = () => {
    const [previews, setPreviews] = useState<{ [key: string]: string | null }>({});

    const setPreview = (themeId: string, file: File | null) => {
        setPreviews((prevPreviews) => ({
            ...prevPreviews,
            [themeId]: file ? URL.createObjectURL(file) : null,
        }));
    };

    return { previews, setPreview };
};
