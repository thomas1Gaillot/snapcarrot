// components/CopyButton.tsx
import React from 'react';
import {Clipboard} from 'lucide-react';
import {Button} from "@/components/ui/button";
import useCopyToClipboard from "@/hooks/use-copy-to-clipboard";

interface CopyButtonProps {
    textToCopy: string;
}

const CopyToClipboardButton: React.FC<CopyButtonProps> = ({textToCopy}) => {
    const {buttonRef, copyToClipboard} = useCopyToClipboard();

    return (
        <Button
            variant={'secondary'}
            ref={buttonRef}
            onClick={() => copyToClipboard(textToCopy)}
        >
            <Clipboard className="size-4"/>
            <span className={'sr-only'}>Copier</span>
        </Button>
    );
};

export default CopyToClipboardButton;
