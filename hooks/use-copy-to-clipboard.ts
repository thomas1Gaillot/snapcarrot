import { useEffect, useRef } from 'react';
import ClipboardJS from 'clipboard';
import { toast } from "@/components/hooks/use-toast";

const useCopyToClipboard = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const copyToClipboard = (textToCopy: string) => {
        if (!buttonRef.current) return;

        const clipboard = new ClipboardJS(buttonRef.current, {
            text: () => textToCopy,
        });

        clipboard.on('success', () => {
            toast({ title: 'Copié !' });
        });

        clipboard.on('error', () => {
            toast({ title: 'Rien à copier.' });
        });


        // Clean up the clipboard instance
        return () => {
            clipboard.destroy();
        };
    };

    return { buttonRef, copyToClipboard };
};

export default useCopyToClipboard;
