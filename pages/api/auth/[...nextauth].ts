import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions, User } from "next-auth";
import { connectToDatabase } from "../../../src/db/config/db";
import { comparePassword } from "../../../src/helpers/bcrypt";
import {z} from 'zod'

export const authOptions : AuthOptions = {
    secret : process.env.JWT_SECRET,
    session : {
        strategy : 'jwt'
    },
    providers : [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password:  { label: "Password", type: "password" }
              },
            async authorize(credentials, req) {
                try {
                    const db = await connectToDatabase()
                    const Users = db.collection('Users')
                    
                    if (!credentials) {
                        throw new Error('No credentials provided')
                    }
                    const {email , password} = credentials
                    const loginInputSchema = z.object({
                        email : 
                        z.string()
                        .email(),
                        password : 
                        z.string()
                        .min(5)
                    }).safeParse(credentials)
    
                    if (!loginInputSchema.success) {
                        throw loginInputSchema.error.message
                    }
                    
                    const user = await Users.findOne({email}) as User | any
                    
                    const isValidPassword = comparePassword(password, user.password)
    
                    if(!isValidPassword) {
                        throw new Error('Incorrect password!')
                    }
                    
                    return { id : user._id, name: user.name, email: user.email }
                    
                } catch (error) {
                    throw error
                }
            },
        })
    ]
}

export default NextAuth(authOptions)
