// pages/api/vote.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { themeId, photoId, contestId, userId } = req.body;

        // Replace with your authentication logic to get the user ID

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            // Upsert the vote to ensure the new vote overwrites the old one if it exists
            const vote = await prisma.vote.upsert({
                where: {
                    userId_themeId_contestId: {
                        userId,
                        themeId: themeId,
                        contestId,
                    },
                },
                update: {
                    photoId,
                },
                create: {
                    userId,
                    photoId,
                    themeId: themeId,
                    contestId,
                },
            });

            res.status(200).json(vote);
        } catch (error) {
            console.error('Error voting:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req?.method} Not Allowed`);
    }
}
