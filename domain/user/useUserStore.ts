import {create} from "zustand";
import {User} from "@/domain/user/User";

interface UserState {
    user: User;
    setUser: (user: User) => void;
}

const useArticleStore = create<UserState>((set) => ({
    user: {name : 'totoG'} as User,
    setUser: (user: User) => set({user}),
}));
export default useArticleStore;
