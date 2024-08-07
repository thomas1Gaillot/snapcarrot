'use client'
import PageTransition from "@/components/[locale]/page-transition";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
export default function MainLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname()
    const useBottomTabs = pathname === '/on-boarding/create-join-contest'
    return (
        <QueryClientProvider client={queryClient}>
            <PageTransition key={pathname}>
                <div className={cn("flex flex-col md:justify-center  h-screen p-4 py-8",
                    useBottomTabs && 'p-4 pb-0 overflow-y-hidden')}>
                    <div className={"max-w-lg w-full mx-auto flex flex-col h-full gap-4 "}>
                        {children}
                    </div>
                </div>
            </PageTransition>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    )
}