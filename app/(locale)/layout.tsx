import "@/app/(locale)/styles/globals.css";
import {Toaster} from "@/components/ui/toaster";
import {Inter} from "next/font/google";
import {Metadata} from "next";
import MainLayout from "@/app/(locale)/main-layout";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Snapcarrot",
    description: "The photo contest made for families and friends.",
    icons: {
        icon: "/carrot.ico",
    },
};
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (<>
            <html>
            <body
                className={`${inter.className} bg-secondary/20  w-screen overflow-x-hidden h-screen`}>
            <MainLayout>
                {children}
            </MainLayout>

            <Toaster/>
            </body>

            </html>
        </>
    );
}
