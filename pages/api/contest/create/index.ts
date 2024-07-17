import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/prisma/prisma";
import {Status} from "@/domain/status/Status";
import {Theme} from "@/domain/theme/Theme";
import axios from "axios";

function generateUnique6DigitAccessCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const postContest = async (req: NextApiRequest, res: NextApiResponse) => {
    const {title, description, themes, userId, endDate} = req.body;

    if (!title || !description || !themes || !userId) {
        return res.status(400).json({error: 'Missing required fields'});
    }

    try {

        // Create new Contest
        const newContest = await prisma.contest.create({
            data: {
                title,
                accessCode : generateUnique6DigitAccessCode(),
                description,
                status: Status.open,
                user : {
                    connect : {
                        id : userId
                    }
                },
                winner: "",
                endDate: new Date(endDate)
            },
        });

        await Promise.all(
            themes.map(async (theme: { name: string; icon: string }) => {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/theme/${newContest.id}/create`, {
                    name: theme.name,
                    icon: theme.icon,
                });
            })
        );

        res.status(201).json(newContest);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await postContest(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}