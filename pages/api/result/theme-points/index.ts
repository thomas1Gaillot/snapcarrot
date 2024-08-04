import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { contestId } = req.query;

    if (!contestId) {
        return res.status(400).json({ error: 'contestId is required' });
    }

    try {
        // Fetch all themes for the given contest including their associated photos and user details
        const themes = await prisma.theme.findMany({
            where: {
                contestId: Number(contestId)
            },
            include: {
                photo: {
                    include: {
                        user: true, // Include user details for each photo
                    },
                },
            },
        });

        // Fetch all votes for the contest
        const votes = await prisma.vote.findMany({
            where: {
                contestId: Number(contestId)
            }
        });

        // Calculate total points for each photo
        const photoPointsMap: { [photoId: number]: number } = {};

        votes.forEach(vote => {
            const photoId = vote.photoId;
            if (!photoPointsMap[photoId]) {
                photoPointsMap[photoId] = 0;
            }
            photoPointsMap[photoId] += 1; // Increment the vote count for the photo
        });

        // Construct the response based on the theme, and find the photo with the most points
        const results = themes.map(theme => {
            // Find the photo with the maximum points within the current theme
            const topPhoto = theme.photo.reduce((maxPhoto, photo) => {
                const points = photoPointsMap[photo.id] || 0;
                if (!maxPhoto || points > (photoPointsMap[maxPhoto.id] || 0)) {
                    return photo;
                }
                return maxPhoto;
            }, null as typeof theme.photo[0] | null);

            // If there's no top photo, it means no votes were cast
            if (!topPhoto) return null;

            // Return the top photo's details along with user information
            return {
                theme: {
                    id: theme.id,
                    name: theme.name,
                    icon: theme.icon
                },
                photoId: topPhoto.id,
                points: photoPointsMap[topPhoto.id] || 0,
                user: {
                    id: topPhoto.user.id,
                    name: topPhoto.user.name || "Unknown"
                }
            };
        }).filter(Boolean); // Remove any null entries from the results

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error on theme-points' });
    }
};
