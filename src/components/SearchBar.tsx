import Product from "@/db/models/products";
import { ChangeEvent } from "react"

const searchProducts = async(searchInput : string) => {
    const response = await fetch(`https://mauproject-hellobutter.vercel.app/api/search?input=${searchInput}`)
    return response.json()
}
interface SearchBarProps {
    setProducts: (products: Product[]) => void; 
    products : Product[]
}

const SearchBar : React.FC<SearchBarProps> = ({setProducts, products}) => {
    const inputHandler = async(e : ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        if(value) {
            const result = await searchProducts(value) 
            setProducts(result)
        } else {
            setProducts(products)
        }
    }
    
    return (
        <>    
<form>   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative w-2/5 mx-auto mt-3">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input onChange={inputHandler} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" autoComplete="off" placeholder="Search Favorite Dessert" />
        <button className="text-white absolute end-2.5 bottom-2.5 bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

        </>
    )
}

export default SearchBar