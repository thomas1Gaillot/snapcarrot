import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/prisma'; // Make sure this path correctly points to your Prisma client instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { photoId } = req.query;

    if (!photoId || Array.isArray(photoId)) {
        return res.status(400).json({ error: 'photoId is required and must be a single value' });
    }

    try {
        // Fetch the photo by its ID
        const photo = await prisma.photo.findUnique({
            where: {
                id: Number(photoId), // Ensure the ID is a number
            },
            include: {
                user: true,   // Include related user data if needed
                theme: true,  // Include related theme data if needed
                contest: true // Include related contest data if needed
            }
        });

        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        // Return the photo details
        res.status(200).json(photo);
    } catch (error) {
        console.error('Error fetching photo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
