import {create} from "zustand";
import {defaultThemes, Theme} from "@/domain/Theme";

interface ContestState {
    setTitle: (title: string) => void;
    title: string;
    description : string,
    setDescription: (description: string) => void;
    themes: Theme[];
    setThemes: (theme: Theme[]) => void;
    endDate: string;
    setEndDate: (endDate: string) => void;
}

const useContestStore = create<ContestState>((set) => ({
    title: "",
    setTitle: (title: string) => set({title}),
    description: "",
    setDescription: (description: string) => set({description}),
    themes: defaultThemes,
    setThemes: (themes: Theme[]) => set({themes}),
    endDate: "",
    setEndDate: (endDate: string) => set({endDate}),
}));


export default useContestStore;
