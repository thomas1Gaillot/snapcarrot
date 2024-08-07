import {NextApiRequest, NextApiResponse} from "next";
import {apiServer} from "@/lib/axiosConfig";

const getGeneralStatsContest = async (req: NextApiRequest, res: NextApiResponse) => {
    const {contestId} = req.query;

    if (!contestId) {
        return res.status(400).json({error: 'Missing contestId'});
    }

    try {
        const [participantsRes, themesRes, photosRes, userAdmin] = await Promise.all([
            apiServer.get(`/api/contest/${contestId}/number-of-participants`),
            apiServer.get(`/api/contest/${contestId}/number-of-themes`),
            apiServer.get(`/api/contest/${contestId}/number-of-photos`),
            apiServer.get(`/api/user/from-contest/${contestId}`),
        ]);

        if (!participantsRes.data || !themesRes.data || !photosRes.data || !userAdmin.data) {
            throw new Error('Failed to fetch contest data');
        }
        res.status(200).json({
            numberOfParticipants: participantsRes.data.numberOfParticipants,
            numberOfThemes: themesRes.data.numberOfThemes,
            numberOfPhotos: photosRes.data.numberOfPhotos,
            userAdminName: userAdmin.data.name,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
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
