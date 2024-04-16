'use client'

import { usePathname } from "next/navigation"
import { useState } from "react"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { BASE_URL } from "@/constants"

const createUser = async(
    name : string,
    email : string,
    username? : string,
    password? : string
    ) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({name, username, email, password})
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Something went wrong!')
    
}

const AuthForm = () => {
    const pathName = usePathname()
    const router = useRouter()
    const isRegisterPage = (pathName === '/register')
    const isLoginPage = (pathName === '/login')

    const [input, setInput] = useState({
        name : '',
        username : '',
        email : '',
        password : ''
    })

    const inputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        setInput(currentInput => {
            return {
                ...currentInput,
                [name] : value
            }
        })
    }
    
    const submitHandler = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() 
    try {
        const {name, username, email, password} = input
        if(isRegisterPage) {
            await createUser(name, email, username, password)
            router.push('/login')
        } else {
            const result = await signIn('credentials', {
                redirect : false,
                email : input.email,
                password : input.password
            })
            router.push('/')
        }
    } catch (error) {
        throw error
    }

    }
    
    return (
        <>
        <div className="flex justify-center bg-white shadow-md shadow-black mx-auto items-center mt-24 w-1/4 rounded-xl">
        <div className="w-5/6 my-4 mb-4">
            <h1 onClick={() => router.push('/')} className="hover:text-gray-500 cursor-pointer font-bold text-2xl float-right">x</h1>
            <h1 className="font-bold mx-auto text-center text-3xl mt-4">
                {isLoginPage ? 'Log In' : 'Register'}
            </h1>
            <form onSubmit={submitHandler}>
                {isRegisterPage && <input onChange={inputHandler} value={input.name} name="name" type="text" placeholder="Full Name" className="mb-4 px-2 w-full py-2 border-2 border-black rounded-lg"/>}
                {isRegisterPage && <input onChange={inputHandler} value={input.username} name="username" type="text" placeholder="Username" className="mb-4 px-2 w-full py-2 border-2 border-black rounded-lg"/>}
                <input onChange={inputHandler} value={input.email} type="text" name="email" placeholder="Email" className="block px-2 w-full my-4 py-2 border-2 border-black rounded-lg"/>
                <input onChange={inputHandler} value={input.password} type="password" name="password" placeholder="Password" className="mb-4 px-2 w-full py-2 border-2 border-black rounded-lg"/>
                {isLoginPage ? 
                <button className="mx-auto bg-black text-white w-2/3 rounded-lg py-2 my-3 flex justify-center items-center duration-500 ease-in hover:bg-pink-500">Log in</button> 
                : <button className="mx-auto bg-black text-white w-2/3 rounded-lg py-2 my-3 flex justify-center items-center duration-500 ease-in hover:bg-pink-500">Register</button>}
            </form>
        <div>
            {isLoginPage &&
            <h1 className="mx-auto flex justify-center font-semibold border-t-2 border-grey text-2xl my-3">SIGN UP</h1>}
            {isLoginPage &&
            <h2 className="mx-auto text-center">Create an account to get access to order history, referral credit, gift reminders, and more!</h2>} 
            {isLoginPage &&
            <button onClick={() => router.push('/register')} className="bg-white border border-black w-full my-4 rounded-lg py-2 font-bold hover:bg-black hover:text-white duration-500">Create Account</button> }
            
        </div>

        </div>
    </div>
        </>
    )
}

export default AuthForm