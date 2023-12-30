'use client'

import NavBar from "@/components/NavBar";
import ProtectingRoute from "@/components/ProtectingRoute";
import { ToggleContext } from "@/ctx/ToggleContext";

import { SessionProvider } from "next-auth/react";


import { ReactNode, useState } from "react";


export default function NavbarLayout({children} : {children : ReactNode}) {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    
    const toggleSearch = () => {
        setIsVisible(!isVisible)
    }

    return (
        <>
        <SessionProvider>
        <NavBar toggleSearch={toggleSearch}/>
        <ProtectingRoute>
            <ToggleContext.Provider value={{isVisible}}>
            {children}
            </ToggleContext.Provider>
        </ProtectingRoute>
        </SessionProvider>
        </>
    )
}