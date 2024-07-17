import {create} from "zustand";
import {defaultThemes, Theme} from "@/domain/theme/Theme";
import {Contest} from "@/domain/contest/Contest";
import {Status} from "@/domain/status/Status";

interface ContestState {
    title: string;
    accessCode?: string;
    description : string,
    themes: Theme[];
    endDate: string;
    startDate:string;
    winner: string;
    status: Status;
    setStartDate: (startDate: string) => void;
    setWinner: (winner: string) => void;
    setStatus: (status: Status) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setThemes: (theme: Theme[]) => void;
    setEndDate: (endDate: string) => void;
    setContest: (contest: Contest) => void;
    setAccessCode: (accessCode: string) => void;
}

const useContestStore = create<ContestState>((set) => ({
    title: "",
    accessCode: "",
    setAccessCode: (accessCode: string) => set({accessCode}),
    setTitle: (title: string) => set({title}),
    description: "",
    setDescription: (description: string) => set({description}),
    themes: defaultThemes,
    setThemes: (themes: Theme[]) => set({themes}),
    endDate: "",
    setEndDate: (endDate: string) => set({endDate}),
    setContest: (contest: Contest) => {
        set({title: contest.title})
        set({description: contest.description})
        set({themes: contest.themes})
        set({endDate: contest.endDate})
    },
    startDate: "",
    setStartDate: (startDate: string) => set({startDate}),
    winner: "",
    setWinner: (winner: string) => set({winner}),
    status: Status.open,
    setStatus: (status: Status) => set({status})
}));


export default useContestStore;
