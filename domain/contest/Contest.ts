import {z} from "zod";
import {Theme} from "@/domain/theme/Theme";
import {Status} from "@/domain/status/Status";

export interface Contest {
    id: string;
    title: string;
    accessCode?: string;
    description: string;
    themes: Theme[];
    winner: string;
    status: Status;
    startDate: string;
    endDate: string;
}
export const contestSchema = z.object({
    title: z.string().min(2, {
        message: "Le titre doit contenir au moins 2 caractères.",
    }),
    description: z.string().min(2, {
        message: "La description doit contenir au moins 2 caractères.",
    }),
    themes: z.array(z.object({
        name: z.string(),
        icon: z.string(),
    })),
    winner: z.string().optional(),
    status: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
})
export type ContestSchema = z.infer<typeof contestSchema>
