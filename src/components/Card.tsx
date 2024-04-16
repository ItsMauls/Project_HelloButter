import { useRouter } from "next/navigation"
import { priceFormat } from "../helpers/priceFormat"
import AddToWishlistButton from "./AddToWishlistButton"
import Product from "@/db/models/products"
import Image from "next/image"

const Card = ({product} : {product : Product}) => {
    const router = useRouter()

    const handleNavigate = () => {
        router.push(`/products/${product.slug}`)
    };

    return (
        <>
           <div className="group relative cursor-pointer">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none relative"
                    onClick={handleNavigate}>
                    <Image
                        width={500}
                        height={500}
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full" />

                    {/* Elemen untuk menghindari menutupi gambar dengan tombol */}
                    <div className="absolute bottom-2 right-2"
                        onClick={(e) => e.stopPropagation()}>
                        <AddToWishlistButton className="cursor-pointer text-3xl text-white text-opacity-40 bg-pink-500 bg-opacity-60 hover:bg-pink-600 hover:scale-105 hover:text-opacity-100 px-2 py-2 rounded-2xl" productId={product._id} />
                    </div>
                </div>
                <div className="mt-4 flex justify-between" onClick={handleNavigate}>
                    <div>
                        <h3 className="font-semibold text-lg text-black">
                            {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">From {priceFormat(product.price)}</p>
                </div>
        </div>

        </>
    )
}

export default Card