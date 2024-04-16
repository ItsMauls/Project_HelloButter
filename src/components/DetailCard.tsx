'use client'
import { priceFormat } from "../helpers/priceFormat"
import AddToWishlistButton from "./AddToWishlistButton"
import Product from "@/db/models/products"

const DetailCard = ({detailProduct} : {detailProduct : Product}) => {
    
    return (
        <>
        <div className="max-w-7xl mt-24 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">    
                    <div className="md:flex-1 px-4">
                        <div className="h-64 md:h-auto bg-gray-100">            
                            {detailProduct.images && <img className="h-full w-full rounded-md object-cover max-w-lg mx-auto" src={detailProduct?.images[0]} alt="Product image" />}
                        </div>
                    </div>
                        
                    <div className="md:flex-1 px-4">
                        <h1 className="text-6xl font-bold text-gray-900 mt-2">
                            {detailProduct?.name}
                        </h1>
                        <p className="mt-3 text-xl text-gray-500">
                            {detailProduct?.excerpt}
                        </p>
                
                        <div className="mt-6">
                            <button className="mr-4 px-8 py-4 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700 transition duration-150 ease-in-out">
                                Add to Cart - {priceFormat(detailProduct?.price)}
                            </button>
                            <AddToWishlistButton text="Add To Wishlist" className="cursor-pointer text-xl text-white bg-pink-600 hover:bg-pink-500 px-4 hover:scale-105 px-2 py-2 rounded-md mt-4 items-center flex" productId={detailProduct?._id}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailCard