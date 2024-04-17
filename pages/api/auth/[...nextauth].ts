import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { connectToDatabase } from "../../../src/db/config/db";
import { comparePassword } from "../../../src/helpers/bcrypt";
import { z } from 'zod'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string

export const authOptions : AuthOptions = {
    secret : process.env.JWT_SECRET,
    session : {
        strategy : 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
          // jika user ditemukan dan memiliki property id, kita asumsikan bahwa autentikasi berhasil
          if (user?.id) {
            token.id = user.id; // Anda bisa menyimpan id pengguna dalam token
          }
          return token;
        },
        async session( { session, token }  :{session : any, token : any}) {
          // Menambahkan properti id ke sesi pengguna
          if (token.id) {
            session.user.id = token.id;
          }
          // Kembalikan sesi yang sudah termasuk id pengguna
          return session;
        },
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
        }),
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ]
}

export default NextAuth(authOptions)
