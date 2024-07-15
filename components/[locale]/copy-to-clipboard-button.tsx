// components/CopyButton.tsx
import React, { useRef, useEffect } from 'react';
import { Clipboard } from 'lucide-react';
import ClipboardJS from 'clipboard';
import {toast} from "@/components/hooks/use-toast";
import {Button} from "@/components/ui/button";

interface CopyButtonProps {
    textToCopy: string;
}

const CopyToClipboardButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!buttonRef.current) return;

        const clipboard = new ClipboardJS(buttonRef.current, {
            text: () => textToCopy,
        });

        clipboard.on('success', () => {
            toast({title :'Article copié au format texte'});
        });

        clipboard.on('error', () => {
            toast({title : 'Rien à copier.'});
        });

        return () => {
            clipboard.destroy();
        };
    }, [textToCopy]);

    return (
        <Button variant={'secondary'} ref={buttonRef}>
            <Clipboard className="size-4"/>
            <span className={'sr-only'}>Copier</span>
        </Button>
    );
};

export default CopyToClipboardButton;
