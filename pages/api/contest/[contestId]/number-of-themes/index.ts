import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

const getNumberOfThemes = async (req: NextApiRequest, res: NextApiResponse) => {
    const { contestId } = req.query;

    if (!contestId) {
        return res.status(400).json({ error: 'Missing contestId' });
    }
    const contestIdNumber = Number(contestId);

    try {
        const themesCount = await prisma.theme.count({
            where: {
                contestId: contestIdNumber,
            },
        });

        res.status(200).json({ numberOfThemes: themesCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getNumberOfThemes(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
