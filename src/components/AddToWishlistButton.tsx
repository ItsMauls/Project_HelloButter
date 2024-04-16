
import { BASE_URL } from "@/constants";
import { ObjectId } from "mongodb";
import { MouseEvent } from "react";
import { CiHeart } from "react-icons/ci";

const wishlistHandler = async(e : MouseEvent<HTMLButtonElement>, productId : ObjectId, ) => {
    e.stopPropagation()
    
    const response = await fetch(`${BASE_URL}/wishlist/add/${productId}`, {
        method : 'POST'
    })
    
    return response.json()
    
}

const AddToWishlistButton = ({productId, text, ...props} : {productId : ObjectId, className : string, text?: string }) => {

    return (
        <>
        <button {...props} onClick={(e) => wishlistHandler(e,productId)}><CiHeart/><span className="block">{text}</span></button>
        </>
    )
}

export default AddToWishlistButton