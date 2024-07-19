import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const getListByUserId = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'Missing userId' });
    }

    try {
        const contests = await prisma.contest.findMany({
            where: {
                photo: {
                    some: {
                        userId: Number(userId),
                    },
                },
            },
            include: {
                photo: true,
            },
        });

        if (!contests) {
            return res.status(404).json({ message: 'No contests found for the given access code' });
        }

        res.status(200).json(contests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getListByUserId(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
