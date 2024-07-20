// pages/api/user/find/by-email/[email].ts
import {NextApiRequest, NextApiResponse} from 'next';
import prisma from "@/prisma/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const {email} = req.query;

    if (!email || typeof email !== 'string') {
        return res.status(400).json({error: 'Invalid email parameter'});
    }

    try {
        const user = await prisma.user.findUnique({
            where: {email},
        });

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}
