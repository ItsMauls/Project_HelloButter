import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "../config/db"
import { hashPassword } from "../../helpers/bcrypt"
import { z } from 'zod'
import { ObjectId } from "mongodb"

export default interface User {
    _id? : ObjectId
    name? : string
    username : string
    email : string
    password : string
} 

export const register = async(req : NextRequest) => {
  

    try {
        const body = await req.json()
        
        const db = await connectToDatabase();
        
        const { username, email, password, name } = body

        const registerInputSchema = z.object({
            username : z.string(),
            email : 
            z.string()
            .email(),
            password : 
            z.string()
            .min(5)
        })

        const parsedInput = registerInputSchema.safeParse(body)
        
        if (!parsedInput.success) {
            throw parsedInput.error.message
        }
        
        const hashedPassword = hashPassword(password);
        const Users = db.collection('Users');
        const existingUser = await Users.findOne({ username });
        const existingEmail = await Users.findOne({ email });

        if (existingUser || existingEmail) {
            const message = existingUser ? 'Username already exists' : 'Email already exists';
            return new NextResponse(JSON.stringify({ message }), { status: 401 });
        }

        const newUser : User = {
            name,
            username,
            email,
            password: hashedPassword
        };

        const response = await Users.insertOne(newUser);
        const temp =  {_id : response.insertedId, ...newUser}
        const output = await Users.findOne({ _id: temp._id }, { projection: { password: 0 } });
        return output
    } catch (error) {
        return NextResponse.json({ message : error }, { status: 400 })
    }
}