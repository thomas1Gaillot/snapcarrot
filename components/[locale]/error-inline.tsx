export default function ErrorInline(error:any) {
    return <pre className={"w-full text-xs text-wrap"}>{JSON.stringify(error)}</pre>
}