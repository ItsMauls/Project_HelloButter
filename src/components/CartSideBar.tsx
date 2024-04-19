import Link from "next/link"
import { IoMdClose } from "react-icons/io"

export const CartSideBar = ( {setCartSideBarOpen, isCartSideBarOpen } : {setCartSideBarOpen : any, isCartSideBarOpen : any}) => {
    return (
        <>
            <div 
            className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${isCartSideBarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setCartSideBarOpen(false)}
            />

            {/* Sidebar */}
            <div 
            className={`fixed top-0 right-0 z-50 h-full transform transition-transform duration-300 ${isCartSideBarOpen ? 'translate-x-0' : 'translate-x-full'} 
                        w-full sm:w-64 bg-white`}
            style={{ transition: 'transform .3s ease-in-out' }}
            >
            {/* Close Button */}
            <button 
                className="absolute top-0 left-0 m-4"
                onClick={() => setCartSideBarOpen(false)}>
                <IoMdClose className="text-2xl"/>
            </button>

            {/* Content */}
            <ul className="p-4 mt-14 font-semibold">
                <Link href={'/products'}><li className="hover-underline-animation">Products</li></Link>
                <li className="my-4 hover-underline-animation">Tentang Kami</li>
                <li className="hover-underline-animation">Hubungi Kami</li>
            </ul>
            </div>
        </>
    )
}