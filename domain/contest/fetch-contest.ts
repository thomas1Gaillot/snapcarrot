import axios from "axios";
import {Contest} from "@/domain/contest/Contest";

export async function fetchContest(accessCode: string): Promise<Contest> {
    const response = await axios.get(`/api/contest/find-by-access-code?accessCode=${accessCode}`);
    return Promise.resolve(response.data);
}



