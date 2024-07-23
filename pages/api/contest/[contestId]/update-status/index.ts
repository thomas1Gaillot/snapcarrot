// pages/api/contest/update-status.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Status } from '@prisma/client'; // Assurez-vous que l'énumération Status est exportée de votre schéma Prisma

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const {contestId} = req.query;
    const { status } = req.body;

    if (!contestId || !status || !Object.values(Status).includes(status)) {
        return res.status(400).json({ error: 'contestId and valid status are required' });
    }

    try {
        const updatedContest = await prisma.contest.update({
            where: {
                id: Number(contestId),
            },
            data: {
                status: status,
            },
            include: {
                user : true
            }
        });
        return res.status(200).json(updatedContest);
    } catch (error) {
        console.error('Error updating contest status:', error);
        return res.status(500).json({ error: 'An error occurred while updating the contest status' });
    } finally {
        await prisma.$disconnect();
    }
}
