'use client'
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode, useRef, useState } from "react"
import AuthForm from "./AuthForm"
import { CiHeart, CiLogout, CiSearch, CiUser } from "react-icons/ci"

type ChildrenType = {
    toggleSearch : ReactNode
}

const NavBar = ({toggleSearch} : any) => {
  const pathName = usePathname()
  const modalRefs = useRef<HTMLDialogElement>(null)
  const [statusHide, setStatusHide] = useState(true)
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const {data : session, status} = useSession()
  const isLoggedIn = status === 'authenticated'
  
  const logoutHandler = () => {
    signOut()
  }
  const closeDialog = () => {
    modalRefs.current && modalRefs.current.close()
    setStatusHide(true)
  }
  const openDialog = () => {
    setStatusHide(false)
    modalRefs.current && modalRefs.current.showModal()
  }

  const inProductsPage =(pathName === '/products')
  
    return (
        <>
        <nav className=" border-b-2  border-gray-200 px-2 sm:px-4 py-2.5">
  <div className="container flex flex-wrap justify-between items-center mx-auto">
    <Link href="/" className="flex items-center">
        <Image 
          height={50}
          width={60}  
          src="/img/logo.png" 
          className="mr-3 h-12 sm:h-14" 
          alt="Logo"/>
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-pink-500">Hallo Butter</span>
    </Link>
    <div className="flex md:order-2 items-center">
        {isLoggedIn && <Link href={'/wishlist'}> <CiHeart className="text-3xl md:mx-3"/> </Link>}
        {!isLoggedIn && <button onClick={openDialog}><CiUser className="text-3xl md:mx-3 mx-2" /></button>}
        {inProductsPage && <button onClick={toggleSearch}><CiSearch className="text-3xl"/></button>}
        {isLoggedIn && <button onClick={logoutHandler} className="w-10 mx-3" > <CiLogout className="text-3xl"/> </button>}
        
        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 4.5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h12a1 1 0 100-2H4zm1 5a1 1 0 100 2h12a1 1 0 100-2H5z" clipRule="evenodd"></path></svg>
        </button>
    </div>
    <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li>
          <Link href="/products" className="block py-2 pr-4 pl-3 text-black text-xl rounded md:bg-transparent md:p-0" aria-current="page">Products</Link>
        </li>
        <li>
          <Link href="/about" className="block py-2 pr-4 pl-3 text-black text-xl rounded md:bg-transparent md:p-0">About Us</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<AuthForm closeDialog={closeDialog} isLogin={isLogin} setIsLogin={setIsLogin} statusHide={statusHide} ref={modalRefs}/>
  {/* <div className=""> */}
  {/* {children} */}
  {/* </div> */}
        </>
    )
}

export default NavBar

