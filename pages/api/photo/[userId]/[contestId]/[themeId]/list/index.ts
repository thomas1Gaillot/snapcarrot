import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/prisma';

const getPhoto = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, contestId, themeId } = req.query;

    if (!userId || !contestId || !themeId) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        const photo = await prisma.photo.findFirst({
            where: {
                userId: Number(userId),
                contestId: Number(contestId),
                themeId: Number(themeId),
            },
        });

        return res.status(200).json(photo);
    } catch (error) {
        console.error('Error fetching photos:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default getPhoto;
