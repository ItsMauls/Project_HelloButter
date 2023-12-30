
import { ObjectId } from "mongodb";
import { MouseEvent } from "react";


const wishlistHandler = async(e : MouseEvent<HTMLButtonElement>, productId : ObjectId, ) => {
    e.stopPropagation()
    
    const response = await fetch(`https://mauproject-hellobutter.vercel.app/api/wishlist/add/${productId}`, {
        method : 'POST'
    })
    
    return response.json()
    
}

const AddToWishlistButton = ({productId} : {productId : ObjectId }) => {

    return (
        <>
        <button className="cursor-pointer bg-pink-500 px-2 py-2 rounded-lg" onClick={(e) => wishlistHandler(e,productId)}>Add to Wishlist</button>
        </>
    )
}

export default AddToWishlistButton