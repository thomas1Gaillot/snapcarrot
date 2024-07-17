import {userSchema} from "@/domain/user/User";
import {NextApiRequest, NextApiResponse} from "next";
import {z} from "zod";
import prisma from "@/prisma/prisma";

const postUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Valider les données de la requête
        const { name, email } = userSchema.parse(req.body);
        // Créer une nouvelle ligne dans la table user
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
            },
        });
        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        });
    } catch (error) {

        if (error instanceof z.ZodError) {
            // Retourner les erreurs de validation
            res.status(400).json({ error: error.errors });
        } else {
            console.log(error)
            res.status(500).json({ error: 'Error creating user' });
        }
    }
}
const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getUsers(req, res);
    } else if (req.method === 'POST') {
        await postUser(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}