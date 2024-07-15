import {create} from "zustand";
import {User} from "@/domain/User";

interface UserState {
    user: User;
    setUser: (user: User) => void;
}

const useArticleStore = create<UserState>((set) => ({
    user: {} as User,
    setUser: (user: User) => set({user}),
}));
export default useArticleStore;
