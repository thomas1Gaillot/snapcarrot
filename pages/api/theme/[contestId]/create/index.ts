import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/prisma';

const postTheme = async (req: NextApiRequest, res: NextApiResponse) => {
    const { contestId } = req.query;
    const { name, icon } = req.body;

    if (!contestId || !name || !icon) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newTheme = await prisma.theme.create({
            data: {
                name,
                icon,
                contestId: Number(contestId),
            },
        });

        res.status(201).json(newTheme);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await postTheme(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
