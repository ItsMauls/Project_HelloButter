import { useSession } from "next-auth/react"
import { redirect, usePathname } from "next/navigation"
import React from "react"

export default function ProtectingRoute ({children} : {children : React.ReactNode}) {
    const {status} = useSession()
    const pathname = usePathname()
    
    if(status !== 'unauthenticated' && (pathname === '/login' || pathname === '/register')) return redirect('/') 
    if((status !== 'authenticated' && status !== 'loading') && pathname === '/wishlist') return redirect('/login') 
    

    return (
        <>
        {children}
        </>
    )

}