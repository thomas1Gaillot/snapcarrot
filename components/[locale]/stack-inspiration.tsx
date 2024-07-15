"use client"
import React, {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
    BookIcon,
    BrainIcon,
    FigmaIcon,
    GithubIcon,
    LayoutPanelTopIcon,
    PaletteIcon,
    PuzzleIcon,
    StarIcon
} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

export default function StackInspiration() {
    const githubItems = [
        {
            title: "shadcn-ui",
            owner: "shadcn",
            repo: "shadcn-ui/ui",
            description: 'Copy and paste library with amazing components. Tailwind optimized. Accessibility first.',
            links: [
                {href: "https://github.com/shadcn-ui/ui", icon: <GithubIcon className="h-4 w-4 text-neutral-500"/>},
                {href: "https://ui.shadcn.com/", icon: <PuzzleIcon className="h-4 w-4 text-neutral-500"/>},
                {href: "https://ui.shadcn.com/themes", icon: <PaletteIcon className="h-4 w-4 text-neutral-500"/>},
                {
                    href: "https://ui.shadcn.com/blocks",
                    icon: <LayoutPanelTopIcon className="h-4 w-4 text-neutral-500"/>
                },

            ],
            starNumber: 1,
            price: "free"
        },
        {
            title: "Stratis UI",
            owner: "",
            repo: "",
            description: "Amazing UI for inspiration. Tailwind optimized.",
            starNumber: 2,
            price: "paying",
            links: [
                {
                    href: "https://www.stratisui.com/components/application-example-details",
                    icon: <FigmaIcon className="h-4 w-4 text-neutral-500"/>
                },
            ],

        },
        {
            title: "Lucide Icons",
            owner: "",
            repo: "",
            description: "Huge collection of icons.",
            starNumber: 3,
            price: "free",
            links: [{href: "https://lucide.dev/icons", icon: <BookIcon className="h-4 w-4 text-neutral-500"/>},
            ],

        },
        {
            title: "Acernity UI",
            owner: "",
            repo: "",
            description: "Copy-and-paste UI library with animations.",
            starNumber: 3,
            price: "free",
            links: [{
                href: "https://ui.aceternity.com/components",
                icon: <PuzzleIcon className="h-4 w-4 text-neutral-500"/>
            },
            ],

        },
        {
            title: "Magic UI",
            owner: "",
            repo: "",
            description: "Copy-and-paste UI library with animations.",
            starNumber: 3,
            price: "free",
            links: [{
                href: "https://magicui.design/docs/components/marquee",
                icon: <PuzzleIcon className="h-4 w-4 text-neutral-500"/>
            },
            ],

        },
        {
            title: "V0.dev",
            owner: "",
            repo: "",
            description: "AI-powered shadcn generator.",
            starNumber: 3,
            price: "free or paying",
            links: [{href: "https://v0.dev/", icon: <BrainIcon className="h-4 w-4 text-neutral-500"/>},
            ],

        },
    ];
    return (
        <Card className="shadow-none border-none">
            <CardHeader>
                <h2 className="text-4xl text-gray-800 font-semibold tracking-tighter sm:text-5xl [@media(max-width:480px)]:text-[2rem]">
                    Amazing Tools
                </h2>
                <CardDescription>
                    {"The GitHub libraries and their star counts being used in this project."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div
                    className="grid md:auto-rows-[1fr] grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
                    {githubItems.map((item, i) => (
                        <div key={i} className="flex h-full">
                            <GitHubItem
                                key={i}
                                title={item.title}
                                description={item.description}
                                starNumber={item.starNumber}
                                price={item.price}
                                owner={item.owner}
                                repo={item.repo}
                                links={item.links}
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

const GitHubItem = ({
                        title,
                        description,
                        starNumber,
                        price,
                        owner,
                        repo,
                        links
                    }: {
    title: string | React.ReactNode;
    description: string;
    owner: string;
    repo: string;
    starNumber: number;
    price: string;
    links: { href: string; icon: JSX.Element }[];
}) => {
    const [stars, setStars] = useState<number | null>(null);
    useEffect(() => {
        async function fetchStars() {
            try {
                const owner = encodeURIComponent('shadcn-ui');
                const repo = encodeURIComponent('ui');

                const response = await axios.get(`/api/github-repo?owner=${owner}&repo=${repo}`);
                const data = await response.data.json();
                setStars(data.stars);
            } catch (error) {
                console.error('Failed to fetch stars:', error);
            }
        }

        fetchStars();
    }, [owner, repo]);

    return <Card className="w-full max-w-sm h-max">
        <CardHeader className="flex items-start gap-2 p-3">
            <div className="flex flex-wrap gap-2">
                {links.map((link, i) => (
                    <Link key={i} href={link.href} target={'_blank'}>
                        <Button key={i} className={"hover:bg-gray-200"}
                                variant={'secondary'} size={'sm'}>
                            {link.icon}
                        </Button>
                    </Link>
                ))}
            </div>
            <div className="grid gap-1">
                <CardTitle>{title}</CardTitle>
                <CardDescription className={'text-xs'}>
                    {description}
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col items-start justify-between px-4 py-3 text-sm text-muted-foreground">
            <div className={"flex justify-between w-full mt-1"}>
                <div className="flex items-center gap-2">
                    <StarIcon className="w-4 h-4"/>
                    <span>{stars !== null ? `${stars}` : 'Loading...'}</span>
                </div>
                <Badge variant={"secondary"} className={"text-xs"}>{price}</Badge>
            </div>
        </CardContent>
    </Card>

}