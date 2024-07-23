import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { contestId } = req.query;

    if (!contestId) {
        return res.status(400).json({ error: 'contestId is required' });
    }

    try {
        // Fetch all users participating in the contest
        const participants = await prisma.user.findMany({
            where: {
                Photo: {
                    some: {
                        contestId: Number(contestId)
                    }
                }
            }
        });

        // Initialize pointsMap for all participants
        const pointsMap: number[] = [];

        participants.forEach(participant => {
            pointsMap[participant.id] = 0;
        });

        // Fetch all votes for the contest
        const votes = await prisma.vote.findMany({
            where: {
                contestId: Number(contestId)
            },
            include: {
                user: true,
                photo: true,
                theme: true,
                contest: true
            }
        });

        // Calculate points for each user
        votes.forEach(vote => {
            if (pointsMap[vote.photo.userId] === undefined) {
                pointsMap[vote.photo.userId] = 0;
            }
            pointsMap[vote.photo.userId] += 1; // Adjust the calculation logic as needed
        });

        // Transform into an array and sort by points
        const results = pointsMap
            .map((points, userId) => ({ userId, contestId: Number(contestId), points, rank: 0 }))
            .filter(result => result.points >= 0)
            .sort((a, b) => b.points - a.points);

        // Assign ranks
        for (let i = 0; i < results.length; i++) {
            results[i].rank = i + 1;
        }
        // Store the results in the database
        const storedResults = await prisma.$transaction(
            results.map(result => prisma.result.upsert({
                where: {
                    userId_contestId: {
                        userId: result.userId,
                        contestId: result.contestId
                    }
                },
                update: {
                    points: result.points,
                    rank: result.rank
                },
                include: {
                    user: true
                },
                create: result
            }))
        );
        res.status(200).json(storedResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error on calculate'});
    }
};
