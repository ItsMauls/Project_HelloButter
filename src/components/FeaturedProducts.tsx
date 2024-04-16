import Link from "next/link"
import { priceFormat } from "../helpers/priceFormat"
import Product from "@/db/models/products"
import { BASE_URL } from "@/constants"
import Image from "next/image"

const getFeaturedProducts = async():Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/featured_products`)
    return response.json()
    }
    
  export default async function FeaturedProducts () {
      const products = await getFeaturedProducts()
     
    return (
        <>
       <div className="bg-white py-6">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-5xl font-extrabold mx-auto text-center tracking-tight text-gray-900">Featured Products</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product : Product) => {
            return (
              <>
              <div key={product._id.toString()} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <Image src={product.images[0]} alt={product.name} className="w-full h-full object-center object-cover lg:w-full lg:h-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    <a>
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{priceFormat(product.price)}</p>
              </div>
            </div> 
            
              </>
            )
          })
          }
        </div>
        <div className="mt-6">
          <Link href="/products">
            <h1 className="text-base font-medium text-indigo-600 hover:text-indigo-500">See more <span aria-hidden="true">&rarr;</span></h1>
          </Link>
        </div>
      </div>
    </div>

        </>
    )
}