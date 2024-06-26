'use client'

import { forwardRef, useState } from "react"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { BASE_URL } from "@/constants"
import { GoogleButton } from "./GoogleButton"

interface Props {
    isLogin? : boolean
    setIsLogin? : any
    closeDialog : () => void
    statusHide?: boolean
  }

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

const AuthForm = forwardRef<HTMLDialogElement, Props>(({setIsLogin, isLogin, closeDialog, statusHide}, ref) => {
    const router = useRouter()
    const isRegisterPage = !isLogin
    const isLoginPage = isLogin

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

    const toRegister = () => setIsLogin(false)
    
    const submitHandler = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() 
    try {
        const {name, username, email, password} = input
        if(isRegisterPage) {
            await createUser(name, email, username, password)
            router.push('/')
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
    {!statusHide && <div onClick={closeDialog} className="fixed inset-0 flex w-full z-50 items-center justify-center bg-gray-500 bg-opacity-70"></div>}
    <dialog ref={ref} className={`${statusHide && 'hidden'} flex justify-center bg-white shadow-md shadow-black mx-auto items-center mt-24 w-full sm:w-3/4 md:w-1/2 lg:w-1/4 rounded-xl p-4`}>
        <div className="w-full">
            <button onClick={closeDialog} className="hover:text-gray-500 cursor-pointer font-bold text-2xl float-right">x</button>
            <h1 className="font-bold text-center text-3xl mt-4">
                {isLoginPage ? 'Log In' : 'Register'}
            </h1>
            <form onSubmit={submitHandler}>
                {isRegisterPage && <input onChange={inputHandler} value={input.name} name="name" type="text" placeholder="Full Name" className="mb-4 px-2 w-full py-2 border-2 border-black rounded-lg"/>}
                {isRegisterPage && <input onChange={inputHandler} value={input.username} name="username" type="text" placeholder="Username" className="mb-4 px-2 w-full py-2 border-2 border-black rounded-lg"/>}
                <input onChange={inputHandler} value={input.email} type="text" name="email" placeholder="Email" className="block px-2 w-full my-4 py-2 border-2 border-black rounded-lg"/>
                <input onChange={inputHandler} value={input.password} type="password" name="password" placeholder="Password" className="mb-4 px-2 w-full py-2 border-2 border-black rounded-lg"/>
                {isLoginPage ? 
                <button className="mx-auto bg-black text-white w-full md:w-2/3 rounded-lg py-2 my-3 flex justify-center items-center duration-500 ease-in hover:bg-pink-500">Log in</button> 
                : <button className="mx-auto bg-black text-white w-full md:w-2/3 rounded-lg py-2 my-3 flex justify-center items-center duration-500 ease-in hover:bg-pink-500">Register</button>}
            </form>
            <div className="flex justify-center">
                <GoogleButton />    
            </div>
            <div>
                {isLoginPage &&
                <h1 className="text-center font-semibold border-t-2 border-gray-200 text-xl mt-3">SIGN UP</h1>}
                {isLoginPage &&
                <h2 className="text-center">Create an account to get access to order history, referral credit, gift reminders, and more!</h2>} 
                {isLoginPage &&
                <button onClick={toRegister} className="bg-white border border-black w-full my-4 rounded-lg py-2 font-bold hover:bg-black hover:text-white duration-500">Create Account</button> }
            </div>
        </div>
    </dialog>
    </>
    )
})

AuthForm.displayName = 'AuthForm';

export default AuthForm