'use client'
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useRef, useState } from "react"
import AuthForm from "./AuthForm"
import { CiHeart, CiLogout, CiSearch, CiUser } from "react-icons/ci"

type ChildrenType = {
    toggleSearch : ReactNode
}

const NavBar = ({toggleSearch} : any) => {
  const pathName = usePathname()
  const router = useRouter()
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
 <nav className="bg-white sticky z-50 border-b top-0 bg-opacity-90 border-gray-300 drop-shadow-sm">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* <!-- Top Section for Logo, Search Icon, Account Icon, and Cart Icon --> */}
      <div className="flex justify-end py-3">
        
        {/* <!-- Right side - Search Icon, Account Icon, and Cart Icon --> */}
        <div className="flex items-center space-x-4">
          {/* <!-- Search Icon --> */}
          {inProductsPage && 
            <button onClick={toggleSearch} className="text-black">
              <CiSearch className="text-2xl"/>
            </button>
          }
          
          {/* <!-- Account Icon --> */}
          {!isLoggedIn && 
            <button 
              onClick={openDialog} 
              className="text-black">
              <CiUser className="text-2xl"/>
            </button>
          } 

          {/* <!-- Wishlist Icon --> */}
          {isLoggedIn &&
            <button 
              onClick={() => router.push('/wishlist')}
              className="text-black">
              <CiHeart className="text-2xl"/>
            </button>
          }
          {/* Logout Icon */}
          {isLoggedIn &&
            <button
              onClick={logoutHandler} 
              className="text-black">
              <CiLogout className="text-2xl"/>
            </button>
          }
        </div>
      </div>

      {/* <!-- Bottom Section for Navigation Links and Logo --> */}
      <div className="flex justify-between items-center py-3">

        {/* <!-- Left side - Menu Icon & Location Icon --> */}
        <div className="flex items-center space-x-4">
          {/* <!-- Menu Icon --> */}
          <button className="text-black">
            {/* <!-- Placeholder for Menu Icon SVG --> */}
          </button>
          {/* <!-- Location Icon --> */}
          <button className="text-black">
            {/* <!-- Placeholder for Location Icon SVG --> */}
          </button>
        </div>
        
        {/* <!-- Center - Navigation Links --> */}
        <div className="flex-grow flex justify-center items-center space-x-8">
          <Link href="/products" className="font-medium text-black hover:text-gray-800 text-md">PRODUCTS</Link>
          <Link href="#" className="font-medium text-black hover:text-gray-800 text-md">TENTANG KAMI</Link>
          <Link href="#" className="font-medium text-black hover:text-gray-800 text-md">HUBUNGI KAMI</Link>
          {/* <Link href="#" className="font-medium text-black hover:text-gray-800 text-md">HALLO BUTTER</Link> */}
          {/* <Link href="#" className="font-medium text-black hover:text-gray-800 text-md">GROCERY</Link>`
          <Link href="#" className="font-medium text-black hover:text-gray-800 text-md">MORE MILK BAR</Link>` */}
        </div>

      </div>

      {/* <!-- Logo centered above navigation links --> */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 pb-3">
        {/* <!-- Logo --> */}
        <Image 
          width={500} 
          height={500} 
          className="h-14 w-full sm:h-9" 
          src="/img/logo.png" 
          alt="Hallo Butter Logo" />
      </div>
    </div>
</nav>

<AuthForm 
  closeDialog={closeDialog} 
  isLogin={isLogin} 
  setIsLogin={setIsLogin} 
  statusHide={statusHide} 
  ref={modalRefs}
  />
        </>
    )
}

export default NavBar

