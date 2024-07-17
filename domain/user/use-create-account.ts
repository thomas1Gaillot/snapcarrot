import {useState} from "react";
import axios from "axios";
import useUserStore from "@/domain/user/useUserStore";
import {UserSchema} from "@/domain/user/User";

export default function useCreateAccount() {
    const [isCreateAccountLoading, setIsLoading] = useState(false)
    const { setUser} = useUserStore()

    async function createAccount(values: UserSchema) {
        setIsLoading(true)
        const userCreated = await axios.post('/api/user', {
            name: values.name,
            email: values.email,
        })
        setUser(userCreated.data)
        setIsLoading(false)
    }

    return {isCreateAccountLoading, createAccount}
}