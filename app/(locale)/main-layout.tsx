'use client'
import PageTransition from "@/components/[locale]/page-transition";
import {AnimatePresence} from "framer-motion";
import {usePathname} from "next/navigation";

export default function MainLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname()
    return (
        <AnimatePresence mode={'wait'}>
            <PageTransition key={pathname}>
                {children}
            </PageTransition>
        </AnimatePresence>)
}