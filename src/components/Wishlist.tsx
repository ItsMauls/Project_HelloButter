import { useEffect, useState } from "react"
import { priceFormat } from "../helpers/priceFormat"
import { ObjectId } from "mongodb"
import Product from "@/db/models/products"
import { BASE_URL } from "@/constants"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { postRequest } from "@/constants/httpRequest"


const getWishlist = async() => {
  const response = await fetch(`${BASE_URL}/wishlist`)
  
  return response.json()
}

type WishListItem = {
  _id : string
  productId : ObjectId
  userId : string
  product : Product[]
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishListItem[]>([]) 
  const { data: session } = useSession()
  const shipping = 15000

  const deleteWishlist = async(productId : string) => {
    
    const response = await fetch(`${BASE_URL}/wishlist/${productId}`, {
      method : 'DELETE'
    })
    
    setWishlist((currentWishlist : WishListItem[]) => currentWishlist.filter((item : WishListItem) => item.productId.toString() !== productId))
    
    return response.json()
  }
  useEffect(() => {
    const asyncFn = async() => {
      const data = await getWishlist()
      
      setWishlist(data)
    }
    asyncFn()
  }, [])
  
  const subTotal = wishlist.map((item) => {
    return item.product.reduce((productAccumulator, p) => productAccumulator * p.price, 1)
  }).reduce((total, itemSubTotal) => total + itemSubTotal, 0)

  const handleOrderNow = async (  ) => {    
              
    const payload = {    
            amount : subTotal,
            "payerEmail" : session?.user?.email,
            description : 'tes',
            
    };
    console.log(payload, 'tes');
    

  try {
      const res = await fetch(`${BASE_URL}/create-payment`, postRequest(payload))
      const paymentData = await res.json();
      console.log(paymentData.res);
      
      if (subTotal !== 0 && paymentData.invoiceUrl) {
          // Redirect user to Xendit payment page
          window.location.href = paymentData.invoiceUrl;
      } else {
          // Handle error
          console.error(paymentData.error);
      }
      
  } catch (error) {
      throw error
  } finally {
      console.log('finally');
      // localStorage.setItem('selectedCart', JSON.stringify([]));
  }
  
  }
  
  
    return (
        <>

  <div className="h-screen bg-gray-100 pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Wishlist</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
      {/* div */}
      {wishlist.map((w : WishListItem)  => {
        return (
          <>
          <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <Image 
            height={500} 
            width={500} 
            src={w?.product[0]?.images[0]}
            alt="product-image"
            className="w-full rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{w?.product[0]?.name}</h2>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              {/* <div className="flex items-center border-gray-100">
                <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" defaultValue="2" min="1" />
                <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
              </div> */}  
              <div className="flex items-center space-x-4">
                <p className="text-sm">{priceFormat(w?.product[0]?.price)}</p>
                <svg onClick={() => deleteWishlist(w?.product[0]?._id.toString())} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
          </>
        )
      })}
        {/* ----- */}
      </div>
      
       <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">{priceFormat(subTotal)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          <p className="text-gray-700">{priceFormat(shipping)}</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">{priceFormat(subTotal + shipping)}</p>
            <p className="text-sm text-gray-700">including VAT</p>
            {/* <AddToWishlistButton /> */}
          </div>
        </div>
        <button 
          onClick={handleOrderNow}
          className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
      </div>  
    </div>
  </div>

        </>
    )
}

export default Wishlist