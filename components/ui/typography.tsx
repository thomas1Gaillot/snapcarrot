import {cn} from "@/lib/utils";

function TypographyBlockquote({children}: { children: JSX.Element | string }) {
    return (
        <blockquote className="mt-6 border-l-2 pl-6 italic text-gray-600">
            {children}
        </blockquote>
    )
}

function TypographyH1({children}: { children: JSX.Element | string }) {
    return (
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-black lg:text-4xl">
            {children}
        </h1>
    )
}

function TypographyH2({children}: { children: JSX.Element | string }) {
    return (
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight text-black first:mt-0">
            {children}
        </h2>
    )
}

function TypographyH3({children}: { children: JSX.Element | string }) {
    return (
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-black">{children}
        </h3>
    )
}

function TypographyH4({children}: { children: JSX.Element | string }) {
    return (
        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight text-black">
            {children}
        </h4>
    )
}

function TypographyInlineCode({children, className}: { children: JSX.Element | string, className ?: string}) {
    return (
        <code className={cn("relative rounded bg-gray-200 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-gray-800", className)}>
            {children}
        </code>
    )
}

function TypographyLarge({children}: { children: JSX.Element | string }) {
    return <div className="text-base font-semibold text-black">{children}</div>
}

function TypographyLead({children}: { children: JSX.Element | string }) {
    return (
        <p className="text-lg text-gray-600">
            {children}
        </p>
    )
}

function TypographyMuted({children}: { children: JSX.Element | string }) {
    return (
        <p className="text-sm text-gray-500">{children}</p>
    )
}

function TypographyList({texts}: { texts: (JSX.Element | string )[]}) {
    return (
        <ul className="my-6 ml-6 list-disc text-gray-800 [&>li]:mt-2">
            {texts.map((child, index) => (
                <li key={index}>{child}</li>
            ))}
        </ul>
    )
}

function TypographyP({children}: { children: JSX.Element | string }) {
    return (
        <p className="leading-7 text-gray-800 [&:not(:first-child)]:mt-6">
            {children}
        </p>
    )
}

function TypographySmall({children}: { children: JSX.Element | string }) {
    return (
        <small className="text-xs font-medium leading-none text-gray-500">{children}</small>
    )
}

interface TableAttributes {
    headers: string[];
    rows: string[][];
}

function TypographyTable({headers, rows}: TableAttributes) {
    return (
        <div className="my-6 w-full overflow-y-auto">
            <table className="w-full text-gray-800">
                <thead>
                <tr className="m-0 border-t p-0 even:bg-gray-100">
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className="border px-4 py-2 text-left font-bold text-black [&[align=center]]:text-center [&[align=right]]:text-right"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="m-0 border-t p-0 even:bg-gray-100">
                        {row.map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export {
    TypographyBlockquote,
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyH4,
    TypographyInlineCode,
    TypographyLarge,
    TypographyLead,
    TypographyMuted,
    TypographyList,
    TypographyP,
    TypographySmall,
    TypographyTable
}
