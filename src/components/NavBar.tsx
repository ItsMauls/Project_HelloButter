'use client'
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useRef, useState } from "react"
import AuthForm from "./AuthForm"
import { CiBoxList, CiHeart, CiLogout, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci"
import { SideBar } from "./SideBar"
import { CartSideBar } from "./CartSideBar"

type ChildrenType = {
    toggleSearch : ReactNode
}

const NavBar = ({toggleSearch} : any) => {
  const [statusHide, setStatusHide] = useState(true)
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const modalRefs = useRef<HTMLDialogElement>(null)
  const pathName = usePathname()
  const router = useRouter()
  const { status } = useSession()
  const isLoggedIn = status === 'authenticated'

  const [isSidebarOpen, setSidebarOpen] = useState<any>(false);
  const [isCartSidebarOpen, setCartSidebarOpen] = useState<any>(false);
  
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
<nav className="bg-white sticky top-0 z-50 border-b border-gray-300 bg-opacity-90 drop-shadow-sm">
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Flex container untuk menyelaraskan item secara horizontal */}
    <div className="flex justify-between items-center py-3">

      {/* Menu Icon (hanya ditampilkan di layar kecil) */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="sm:hidden text-black">
        {/* Placeholder for Menu Icon SVG */}
        <CiBoxList className="text-2xl"/>
      </button>

      {/* Logo (selalu terlihat) */}
      <div className="sm:flex sm:grow justify-center overflow-hidden" style={{ height: '64px' }}> {/* Setting a fixed height */}
        <Image 
          onClick={() => router.push('/')}
              src="/img/logo.png" 
              alt="Hallo Butter Logo"
              width={500} 
              height={500}
              className="h-full w-auto object-contain" // Ensure the image fits within the container without altering its aspect ratio
        />
      </div>

      {/* Icons Section: Search, User, Wishlist, Logout (visible only on small screens) */}
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        {inProductsPage && 
          <button onClick={toggleSearch} className=" text-black">
            <CiSearch className="text-2xl"/>
          </button>
        }

        {/* Account and Wishlist Icons */}
        {!isLoggedIn && 
          <button onClick={openDialog} className=" text-black">
            <CiUser className="text-2xl"/>
          </button>
        }
        {isLoggedIn && <>
          <button  
            onClick={() => router.push('/wishlist')}
            className=" text-black">
            <CiHeart className="text-2xl"/>
          </button>
          <button  
            onClick={() => setCartSidebarOpen(true)}
            className=" text-black">
            <CiShoppingCart className="text-2xl"/>
          </button>
          <button onClick={logoutHandler} className=" text-black">
            <CiLogout className="text-2xl"/>
          </button>
        </>}
      </div>
    </div>

    {/* Navigation Links (only visible on large screens) */}
    <div className="hidden sm:flex justify-between items-center py-3">
      <div className="flex-grow flex justify-center items-center space-x-8">
        <Link href="/products" className="font-medium text-black hover:text-gray-800 text-md">PRODUCTS</Link>
        <Link href="#" className="font-medium text-black hover:text-gray-800 text-md">TENTANG KAMI</Link>
        <Link href="#" className="font-medium text-black hover:text-gray-800 text-md">HUBUNGI KAMI</Link>
      </div>
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
  <SideBar 
    setSidebarOpen={setSidebarOpen}
    isSidebarOpen={isSidebarOpen}
    />
  <CartSideBar
    setCartSideBarOpen={setCartSidebarOpen}
    isCartSideBarOpen={isCartSidebarOpen}
    />
        </>
    )
}

export default NavBar

