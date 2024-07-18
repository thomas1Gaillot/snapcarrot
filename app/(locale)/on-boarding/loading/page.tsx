'use client'
import { useEffect } from 'react';
import Image from 'next/image'; // Import the Image component for Next.js
import { useRouter } from 'next/navigation';
import {TypographyLead, TypographySmall} from "@/components/ui/typography";
import LoadingComponent from "@/components/[locale]/loading-component"; // Import the useRouter hook

export default function LoadingPage() {
    const router = useRouter();

    useEffect(() => {
        // Set a timeout to redirect after 1 second
        const timer = setTimeout(() => {
            router.push('/on-boarding/start-with-username');
        }, 2000);

        // Clear timeout if the component is unmounted before the timeout completes
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <>
            <LoadingComponent />
        </>
    );
}
