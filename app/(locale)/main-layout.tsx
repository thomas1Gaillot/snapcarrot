'use client'
import {cn} from "@/lib/utils";
import {useSidebarToggle} from "@/components/hooks/use-sidebar-toggle";

export default function MainLayout({children}: { children: React.ReactNode }) {
    const sidebar = useSidebarToggle()

    if (!sidebar) return null;
    return (
        <div
            className={cn("flex transition-[margin-left] ease-in-out duration-300 ",
                sidebar?.isOpen === false ? "lg:ml-[60px]" : "lg:ml-56  2xl:ml-72 3xl:ml-80")}>
            <div className={"overflow-y-aut   w-full h-full  3xl:px-32 2xl:px-16 px-4 py-12 pb-10 md:px-8"}>
                {children}</div>
        </div>
    )
}