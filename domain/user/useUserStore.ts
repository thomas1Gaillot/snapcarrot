import {create} from "zustand";
import {User} from "@/domain/user/User";

interface UserState {
    user: User;
    setUser: (user: User) => void;
}

const useUserStore = create<UserState>()(
    (set) => ({
        user: {} as User,
        setUser: (user: User) => set({user}),
    }),
);
export default useUserStore;
