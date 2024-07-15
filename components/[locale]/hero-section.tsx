"use client";
import {Highlight} from "@/components/acernityui/hero-highlight";
import React from "react";


export default function HeroSection() {

    return (<>
            <div className="mt-5 max-w-2xl text-center mx-auto">

                <h2 className="text-4xl text-gray-800 font-semibold tracking-tighter sm:text-5xl [@media(max-width:480px)]:text-[2rem]">
                    Fast. <Highlight className={"text-black dark:text-white"}> Efficient. Easy.</Highlight>
                </h2>

            </div>
            <div className="mt-5 max-w-3xl text-center mx-auto">
                <p className=" text-muted-foreground">
                    Discover a world of endless possibilities with our side project platform. Bring your ideas
                    to life and share them with the world.
                </p>
            </div>
            <div className="mt-10 relative max-w-5xl mx-auto">
                <div
                    className="absolute bottom-12 -start-20 -z-[1] w-48 h-48 bg-gradient-to-b from-primary-foreground via-primary-foreground to-background p-px rounded-lg">
                    <div className="w-48 h-48 rounded-lg bg-background/10"/>
                </div>
                <div
                    className="absolute -top-12 -end-20 -z-[1] w-48 h-48 bg-gradient-to-t from-primary-foreground via-primary-foreground to-background p-px rounded-full">
                    <div className="w-48 h-48 rounded-full bg-background/10"/>
                </div>
            </div>
        </>
    )
}




