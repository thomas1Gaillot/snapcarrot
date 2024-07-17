import {create} from "zustand";
import {User} from "@/domain/user/User";
import {persist} from "zustand/middleware";

interface UserState {
    user: User;
    setUser: (user: User) => void;
}

const useArticleStore = create<UserState>()(persist(
    (set) => ({
        user: {} as User,
        setUser: (user: User) => set({user}),
    }),
    {
        name: "user-storage", // nom de la clé dans le localStorage
    }
));
export default useArticleStore;
