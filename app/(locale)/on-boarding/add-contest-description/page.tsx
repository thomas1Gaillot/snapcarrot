'use client'
import {z} from "zod";
import InConstruction from "@/components/[locale]/in-construction";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Le titre doit contenir au moins 2 caractères.",
    }),
})

export default function AddContestTitle() {
    return <>
        <InConstruction/>
    </>
}