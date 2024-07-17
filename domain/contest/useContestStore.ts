import {create} from "zustand";
import {defaultThemes, Theme} from "@/domain/theme/Theme";
import {Contest} from "@/domain/contest/Contest";

interface ContestState {
    setTitle: (title: string) => void;
    title: string;
    accessCode?: string;
    description : string,
    setDescription: (description: string) => void;
    themes: Theme[];
    setThemes: (theme: Theme[]) => void;
    endDate: string;
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
}));


export default useContestStore;
