import React from 'react';
import {cn} from '@/lib/utils';
import {Button} from "@/components/ui/button"; // Assurez-vous d'avoir la fonction `cn` pour la gestion des classes conditionnelles

const PaymentToggleButtons = ({isFree, onChange}: { isFree: boolean, onChange: (...event: any[]) => void }) => {
    return (
        <div className="inline-flex rounded-lg shadow-sm">
            <Button size={'sm'}
                    className={cn('rounded-r-none')}
                    type="button"
                    variant={isFree ? 'default' : 'secondary'}
                    onClick={() => onChange(true)}
            >
                Free
            </Button>
            <Button size={'sm'}
                    className={cn('rounded-l-none')}
                    type="button"
                    variant={!isFree ? 'default' : 'secondary'}
                    onClick={() => onChange(false)}
            >
                Ranged Price
            </Button>
        </div>
    );
};

export default PaymentToggleButtons;
