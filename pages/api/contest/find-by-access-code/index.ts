import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const getContestByAccessCode = async (req: NextApiRequest, res: NextApiResponse) => {
    const { accessCode } = req.query;

    if (!accessCode) {
        return res.status(400).json({ error: 'Missing accessCode' });
    }

    try {
        const contest = await prisma.contest.findUnique({
            where: {
                accessCode: accessCode as string,
            },
            include: {
                user: true,
            }
        });

        if (!contest) {
            return res.status(404).json({ message: 'No contest found for the given access code' });
        }

        // Rename the `user` field to `adminUser`
        const response = {
            ...contest,
            adminUser: contest.user,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getContestByAccessCode(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
