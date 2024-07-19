import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const getContestAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
    const { contestId } = req.query;

    if (!contestId) {
        return res.status(400).json({ error: 'Missing contestId' });
    }
    const contestIdNumber = Number(contestId);

    try {
        const contest = await prisma.contest.findUnique({
            where: {
                id: contestIdNumber,
            },
            include: {
                user: true,
            },
        })
        if (!contest) {
            return res.status(404).json({ message: 'Admin of the contest not found.' });
        }

        res.status(200).json(contest.user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getContestAdmin(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
