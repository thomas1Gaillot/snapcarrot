import {z} from "zod";

export interface User {
    id?:string;
    name: string;
    email: string;
}

export const userSchema = z.object({
    name: z.string().min(2, {
        message: "Le nom de jeu doit contenir au moins 2 caractères.",
    }),
    email: z
        .string().min(1, {
            message: "L'email est requis."
        })
        .email({
            message: "L'email n'est pas valide."
        })
})

export type UserSchema = z.infer<typeof userSchema>