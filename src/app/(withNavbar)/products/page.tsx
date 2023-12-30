'use client'

import Card from "@/components/Card"

import SearchBar from "@/components/SearchBar"
import { ToggleContext } from "@/ctx/ToggleContext"
import Product from "@/db/models/products"

import { useContext, useEffect, useState } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'


    const Products = async():Promise<Product[]> => {
        const response = await fetch(`https://mauproject-hellobutter.vercel.app/api/products`)        
        return response.json()     
    }

    export default function GetAllProducts () {
        const {isVisible} = useContext(ToggleContext)
        const [products, setProducts] = useState<Product[]>([])
        const [isLoading, setIsLoading] = useState(false)
        const [hasMore, setHasMore] = useState(true)    
        
        useEffect(() => {
            const asyncFn = async() => {
                setIsLoading(true)
                const data : Product[] = await Products()
                setProducts(data)
                setIsLoading(false)
            }
            asyncFn()
        }, [])


        const fetchMoreData = async () => {
            // Ambil data dari server
            const newProducts = await Products();
            setProducts([...products, ...newProducts]);
            
            // Jika jumlah produk baru kurang dari limit, maka tidak ada lagi data
            setHasMore(newProducts.length >= 10);
        };

    return (
        <>
            { isVisible && <SearchBar setProducts={setProducts} products={products}/>}
            <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        CAKES
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Layers of frosting, cake crumbs and see-through-sides make these easy-to-spot-cakes darn near impossible to resist.
                    </p>
                </div>
        

                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<img className="mx-auto" src="https://i.pinimg.com/originals/45/12/4d/45124d126d0f0b6d8f5c4d635d466246.gif"/>}
                    >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => {
                            return (
                                <>    
                                <Card key={product._id.toString()} product={product}/>
                                </>
                            )
                        })}
                    </div>  
                </InfiniteScroll>
            </div>
        </div>
    </>
)}
