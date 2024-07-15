export default function Layout({children}: { children: React.ReactNode }) {
    return <div className={"flex flex-col md:justify-center  h-screen p-4 py-8"}>
        <div className={"max-w-lg mx-auto flex flex-col md:justify-center gap-4 "}>
            {children}
        </div>
    </div>
}