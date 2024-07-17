import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/prisma';

const fetchThemes = async (req: NextApiRequest, res: NextApiResponse) => {
    const { contestId } = req.query;

    if (!contestId) {
        return res.status(400).json({ error: 'Missing contest ID' });
    }

    try {
        const themes = await prisma.theme.findMany({
            where: {
                contestId: Number(contestId),
            },
        });

        if (!themes) {
            return res.status(404).json({ error: 'Themes not found' });
        }

        res.status(200).json(themes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await fetchThemes(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
