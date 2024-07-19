'use client'
import PageTransition from "@/components/[locale]/page-transition";
import {usePathname} from "next/navigation";

export default function MainLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname()

    return (
        <PageTransition key={pathname}>
            <div className={"flex flex-col md:justify-center  h-screen p-4 py-8"}>
                <div className={"max-w-lg w-full mx-auto flex flex-col h-full gap-4 "}>
                    {children}
                </div>
            </div>
        </PageTransition>)
}