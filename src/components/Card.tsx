import { useRouter } from "next/navigation"
import { priceFormat } from "../helpers/priceFormat"
import AddToWishlistButton from "./AddToWishlistButton"
import Product from "@/db/models/products"

const Card = ({product} : {product : Product}) => {
    const router = useRouter()
    return (
        <>
          <div className="" onClick={() => router.push(`/products/${product.slug}`)}>
                    <div className="group relative cursor-pointer">
                        <div className=" w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                            <img src={product.images[0]} alt="Birthday Cake" className=" w-full h-full object-center object-cover lg:w-full lg:h-full"/>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="font-semibold text-lg text-black ">
                                    <a>
                                        <span aria-hidden="true" className="absolute inset-0"></span>
                                        {product.name}
                                    </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                            </div>
                            
                            <p className="text-sm font-medium text-gray-900">From {priceFormat(product.price)}</p>
                        </div>
                    </div>
                        <AddToWishlistButton productId={product._id}/>
            </div>
        </>
    )
}

export default Card