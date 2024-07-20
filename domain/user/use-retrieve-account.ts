import {useState} from "react";
import axios from "axios";
import useUserStore from "@/domain/user/useUserStore";
import {EmailSchema} from "@/app/(locale)/on-boarding/start-with-username/components/retrieve-account-dialog";
import {toast} from "@/components/hooks/use-toast";
import {useRouter} from "next/navigation";

export default function useRetrieveAccount() {
    const [isLoading, setIsLoading] = useState(false)
    const {setUser} = useUserStore()
    const router = useRouter()

    async function retrieveAccount(values: EmailSchema) {
        try {
            setIsLoading(true)
            const userRetrieve = await axios.get(`/api/user/find/by-email/${values.email}`)
            setUser(userRetrieve.data)
            setIsLoading(false)
            toast({title : 'Bon retour ' + userRetrieve.data.name} )
            router.push('/on-boarding/create-join-contest')


        } catch (e) {
            setIsLoading(false)
            toast({title : 'Aucun compte trouvé avec cet email'})

        }
    }

    return {isLoading, retrieveAccount}
}
