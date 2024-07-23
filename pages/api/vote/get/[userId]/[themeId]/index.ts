import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { themeId, userId } = req.query;

    if (!themeId || !userId) {
        return res.status(400).json({ error: 'Missing themeId or userId' });
    }

    try {
        const vote = await prisma.vote.findFirst({
            where: {
                themeId: Number(themeId),
                userId: Number(userId),
            },
            include: {
                photo: true,
            },
        });

        if (!vote) {
            return res.status(404).json({ error: 'Vote not found' });
        }

        res.status(200).json(vote.photo);
    } catch (error) {
        console.error('Error fetching vote:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
