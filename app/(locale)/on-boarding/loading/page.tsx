'use client'
import { useEffect } from 'react';
import Image from 'next/image'; // Import the Image component for Next.js
import { useRouter } from 'next/navigation';
import {TypographyLead, TypographySmall} from "@/components/ui/typography"; // Import the useRouter hook

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
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <div className="animate-bounce">
                    <Image
                        src="/carrot.ico" // Replace with your logo's path
                        alt="Logo"
                        width={100} // Set the width of your logo
                        height={100} // Set the height of your logo
                    />
                </div>
                <TypographyLead>Les carottes cuisent ...</TypographyLead>
            </div>
        </>
    );
}
