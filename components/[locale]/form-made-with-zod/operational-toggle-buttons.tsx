import React from 'react';
import {cn} from '@/lib/utils';
import {Button} from "@/components/ui/button"; // Assurez-vous d'avoir la fonction `cn` pour la gestion des classes conditionnelles

const OperationalToggleButtons = ({isOperational, onChange}: { isOperational: boolean, onChange: (...event: any[]) => void }) => {
    return (
        <div className="inline-flex rounded-lg shadow-sm">
            <Button size={'sm'}
                    className={cn('rounded-r-none')}
                    type="button"
                    variant={isOperational ?  'secondary':'default'}
                    onClick={() => onChange(false)}
            >
                Not yet operational
            </Button>
            <Button size={'sm'}
                    className={cn('rounded-l-none')}
                    type="button"
                    variant={!isOperational ? 'secondary':'default'}
                    onClick={() => onChange(true)}
            >
                Operational
            </Button>
        </div>
    );
};

export default OperationalToggleButtons;
