import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { contestId } = req.query;

    if (!contestId) {
        return res.status(400).json({ error: 'contestId is required' });
    }

    try {
        // Fetch all photos for the given contest with their themes
        const photos = await prisma.photo.findMany({
            where: {
                contestId: Number(contestId)
            },
            include: {
                theme: true
            }
        });

        // Initialize a map to store points by theme and photo
        const themePointsMap: { [key: number]: { photoId: number, points: number }[] } = {};

        // Fetch all votes for the contest
        const votes = await prisma.vote.findMany({
            where: {
                contestId: Number(contestId)
            },
            include: {
                photo: {
                    include: {
                        theme: true
                    }
                }
            }
        });

        // Calculate points for each photo and organize by theme
        votes.forEach(vote => {
            const themeId = vote.photo.theme.id;
            const photoId = vote.photoId;

            if (!themePointsMap[themeId]) {
                themePointsMap[themeId] = [];
            }

            // Find or create a points record for the photo under its theme
            let photoPoints = themePointsMap[themeId].find(p => p.photoId === photoId);
            if (!photoPoints) {
                photoPoints = { photoId, points: 0 };
                themePointsMap[themeId].push(photoPoints);
            }
            photoPoints.points += 1; // Increment the vote count for the photo
        });

        // Convert theme points map into an array for response
        const themeResults = Object.entries(themePointsMap).map(([themeId, photoPoints]) => ({
            themeId: Number(themeId),
            themeName: photos.find(p => p.theme.id === Number(themeId))?.theme.name || "Unknown",
            photos: photoPoints.map(pp => ({
                photoId: pp.photoId,
                points: pp.points
            }))
        }));

        res.status(200).json({ results: themeResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error on theme-points' });
    }
};
