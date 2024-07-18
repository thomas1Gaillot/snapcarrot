import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/prisma';

// Handler for POST requests to /api/photo
const postPhoto = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { url, userId, themeId, contestId } = req.body;

    if (!url || !userId || !themeId || !contestId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const photo = await prisma.photo.upsert({
            where: {
                userId_themeId_contestId: {
                    userId: parseInt(userId, 10),
                    themeId: parseInt(themeId, 10),
                    contestId: parseInt(contestId, 10),
                },
            },
            update: {
                url,
            },
            create: {
                url,
                userId: parseInt(userId, 10),
                themeId: parseInt(themeId, 10),
                contestId: parseInt(contestId, 10),
            },
        });

        return res.status(200).json(photo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Main handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await postPhoto(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
