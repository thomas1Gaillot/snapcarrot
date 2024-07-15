import {create} from "zustand";

interface ContestState {
    setTitle: (title: string) => void;
    title: string;
}

const useContestStore = create<ContestState>((set) => ({
    title: "",
    setTitle: (title: string) => set({title}),
}));

export default useContestStore;
