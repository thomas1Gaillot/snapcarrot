'use client'
import PageTransition from "@/components/[locale]/page-transition";
import {usePathname} from "next/navigation";

export default function MainLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname()

    return (
        <PageTransition key={pathname}>
            {children}
        </PageTransition>)
}