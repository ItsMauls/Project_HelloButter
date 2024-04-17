import Link from "next/link"
import { FaArrowRight, FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col justify-between mb-6 lg:mb-0 lg:w-1/2">
              <h2 className="text-2xl font-bold mb-3">INVITE Hallo Butter TO YOUR B'DAY PARTY</h2>
              <p className="mb-3">Tell us your birthday + receive a special treat with your birthday order :)</p>
              <form className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                <input type="email" placeholder="Your Email*" className="w-full flex-1 md:w-auto p-2 bg-transparent border-b-white border-b-2 text-white" required/>
                <input type="text" placeholder="Your Birthday MM/DD" className="w-full md:w-auto flex-1 p-2 bg-transparent border-white border-b-2 text-white" required/>
                {/* Mobile */}
                <button type="submit" className="md:w-auto w-full text-xl md:block hidden hover:scale-125 delay-200 text-white p-2 px-4 flex-shrink-0"><FaArrowRight/></button>
                {/* Desktop */}
                <button type="submit" className="md:w-auto w-full font-mono md:hidden font-semibold visible bg-pink-500 text-white p-2 px-4 flex-shrink-0">SUBMIT</button>
              </form>
              <div className="flex gap-4 my-4">
                <Link href="#" className="text-2xl hover:text-pink-500"><FaTwitter/> </Link>
                <Link href="#" className="text-2xl hover:text-pink-500"> <FaTiktok /> </Link>
                <Link href="#" className="text-2xl hover:text-pink-500"><FaFacebook/></Link>
                <Link href="#" className="text-2xl hover:text-pink-500"><FaInstagram/></Link>
              </div>
            </div>
      
            <div className="grid grid-cols-2 lg:col-span-2 gap-8">
              <div className="mb-6 lg:mb-0">
                <h3 className="text-lg font-semibold mb-2">LEARN</h3>
                <nav>
                  <ul className="space-y-1">
                    <li><Link href="#" className="hover:text-gray-400">About Hallo Butter</Link></li>
                    <li><Link href="#" className="hover:text-gray-400">FAQ</Link></li>
                    <li><Link href="#" className="hover:text-gray-400">About Us</Link></li>
                  </ul>
                </nav>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Available On</h3>
                <nav>
                  <ul className="space-y-1">
                    <li><Link href="#" className="hover:text-gray-400">Tokopedia</Link></li>
                    <li><Link href="#" className="hover:text-gray-400">Tiktok Shop</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
      
          <div className="flex flex-col lg:flex-row justify-between items-center border-t border-gray-700 pt-4 mt-6">
            {/* <div className="flex flex-wrap gap-4 mb-4 lg:mb-0">
              <a href="#" className="hover:text-gray-400">Terms of Service</a>
              <a href="#" className="hover:text-gray-400">Privacy Policy</a>
              <a href="#" className="hover:text-gray-400">Sitemap</a>
              <a href="#" className="hover:text-gray-400">Accessibility</a>
            </div> */}
            <div></div>
            <div className="text-sm ">
              © 2024 Hallo Butter
            </div>
          </div>
        </div>
      </footer>
      
    )
}