'use client'
import { useEffect } from 'react';
import Image from 'next/image'; // Import the Image component for Next.js
import { useRouter } from 'next/navigation';
import {TypographyLead, TypographySmall} from "@/components/ui/typography";
import LoadingComponent from "@/components/[locale]/loading-component";
import useUserStore from "@/domain/user/useUserStore"; // Import the useRouter hook

export default function LoadingPage() {
    const router = useRouter();
    const {user} = useUserStore()

    useEffect(() => {
        // Set a timeout to redirect after 1 second
        const timer = setTimeout(() => {
            if(user?.id){
                router.push('/on-boarding/create-join-contest');
            } else {
                router.push('/on-boarding/start-with-username');
            }
        }, 2000);

        // Clear timeout if the component is unmounted before the timeout completes
        return () => clearTimeout(timer);
    }, [router, user]);

    return (
        <>
            <LoadingComponent />
        </>
    );
}
