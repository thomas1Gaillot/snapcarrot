import {User} from "@/domain/user/User";

export interface Result {
    id: string;
    user: User;
    points: number;
    rank: number;
}