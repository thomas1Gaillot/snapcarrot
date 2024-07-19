import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/prisma';

const getPhotosByContestAndTheme = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { contestId, themeId } = req.query;

    if (!contestId || !themeId) {
        return res.status(400).json({ message: 'Missing required query parameters' });
    }

    try {
        const photos = await prisma.photo.findMany({
            where: {
                contestId: Number(contestId),
                themeId: Number(themeId),
            },
        });

        return res.status(200).json(photos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Main handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getPhotosByContestAndTheme(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
