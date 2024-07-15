import { useEffect, useRef } from "react";

const useSound = (url: string) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio(url);
    }, [url]);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return { play };
};

export default useSound;
