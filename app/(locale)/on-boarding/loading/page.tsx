'use client'
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import LoadingComponent from "@/components/[locale]/loading-component";
import useUserStore from "@/domain/user/useUserStore"; // Import the useRouter hook

export default function LoadingPage() {
    const router = useRouter();
    const {user} = useUserStore()

    useEffect(() => {
        // Set a timeout to redirect after 1 second
        const timer = setTimeout(() => {
            if (user?.id) {
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
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
                <LoadingComponent/>
            </div>
        </>
    );
}
