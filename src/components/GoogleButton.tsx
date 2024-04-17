import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FcGoogle } from 'react-icons/fc'
export const GoogleButton = () => {
    const router = useRouter()

    function GoogleLoginHandler()  {
   
        try {
            signIn('google')            
        } catch (error) {
            throw error
        } finally {
            router.push('/')
        }
    
    }

    return (
    <button
        onClick={GoogleLoginHandler}
        className="p-3 border rounded-xl hover:scale-105 flex items-center gap-2 font-medium justify-center">
        <p>
            <FcGoogle size={25} />
        </p>
        Continue with Google
    </button>
    )
}