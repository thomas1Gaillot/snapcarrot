import {NextApiRequest, NextApiResponse} from "next";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.query.id),
            },
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getUser(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}