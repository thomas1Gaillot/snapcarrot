import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const getContestsByUserId = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'Missing userId' });
    }
    const userIdNumber = Number(userId);
    try {
        const contests = await prisma.contest.findMany({
            where: {
                userId: userIdNumber,
            },
        });

        if (contests.length === 0) {
            return res.status(404).json({ message: 'No contests found for the given userId' });
        }

        res.status(200).json(contests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getContestsByUserId(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
