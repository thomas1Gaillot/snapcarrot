import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { contestId } = req.query;

    if (!contestId) {
        return res.status(400).json({ error: 'Missing contestId' });
    }

    try {
        const voteCount = await prisma.vote.count({
            where: {
                contestId: Number(contestId),
            },
        });

        if (!voteCount) {
            res.status(200).json(0);
        }

        res.status(200).json(voteCount);
    } catch (error) {
        console.error('Error fetching numbers of vote:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
