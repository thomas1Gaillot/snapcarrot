import { useState } from "react";

export const useAllPhotoPreviews = () => {
    const [previews, setPreviews] = useState<{ [themeId: string]: { [userId: string]: string | null } }>({});

    const setPreview = (themeId: string, userId: string, file: File | null) => {
        setPreviews((prevPreviews) => ({
            ...prevPreviews,
            [themeId]: {
                ...prevPreviews[themeId],
                [userId]: file ? URL.createObjectURL(file) : null,
            },
        }));
    };

    return { previews, setPreview };
};
