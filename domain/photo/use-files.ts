import { useState } from "react";

export const useFiles = () => {
    const [files, setFiles] = useState<{ [key: string]: File | null }>({});

    const setFile = (themeId: string, file: File | null) => {
        setFiles((prevFiles) => ({
            ...prevFiles,
            [themeId]: file,
        }));
    };

    return { files, setFile };
};
