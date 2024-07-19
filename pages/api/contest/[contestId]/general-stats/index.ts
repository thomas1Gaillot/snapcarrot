import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const getGeneralStatsContest = async (req: NextApiRequest, res: NextApiResponse) => {
    const { contestId } = req.query;

    if (!contestId) {
        return res.status(400).json({ error: 'Missing contestId' });
    }

    try {
        const [participantsRes, themesRes, photosRes] = await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contest/${contestId}/number-of-participants`),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contest/${contestId}/number-of-themes`),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contest/${contestId}/number-of-photos`),
        ]);

        if (!participantsRes.data || !themesRes.data || !photosRes.data) {
            throw new Error('Failed to fetch contest data');
        }

        res.status(200).json({
            numberOfParticipants: participantsRes.data.numberOfParticipants,
            numberOfThemes: themesRes.data.numberOfThemes,
            numberOfPhotos: photosRes.data.numberOfPhotos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getGeneralStatsContest(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
