import { NextRequest } from "next/server"
import { connectToDatabase } from "../config/db"
import { Session } from "inspector"
import { ObjectId, WithId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"


export default interface Wishlist {
    _id : ObjectId
    userId : ObjectId
    productId : ObjectId
    createdAt : Date
    updatedAt : Date
    
}

export const getWishlist = async() => {
    try {
        const db = await connectToDatabase()
        const Wishlists = db.collection('Wishlists')
        const Users = db.collection('Users')
        const session : Session | any = await getServerSession(authOptions)
        const user: WithId<Document> | any = await Users.findOne({email : session.user.email})
        
        const pipeline = [
            {
              $lookup:
                {
                  from: "Products",
                  localField: "productId",
                  foreignField: "_id",
                  as: "product"
                }
            }
          ]

        const data = await Wishlists.aggregate(pipeline).match({userId : user ? user._id : session.user.id}).toArray() 
        return data
    } catch (error) {
        throw error
    }
}

export const addWishlist = async(req:NextRequest) => {
    try {
        console.log('tes wishlsit');
        
        const url = new URL(req.url)
        const db = await connectToDatabase()
        const Wishlist = db.collection('Wishlists')
        const Users = db.collection('Users')

        const session : Session | any = await getServerSession(authOptions)
        console.log(session, 'sesi');
        
        const user: WithId<Document> | any = await Users.findOne({email : session.user.email}) 
        
        const pathname = url.pathname
        const segments = pathname.split('/')
        
        const productId = new ObjectId(segments[4]) 
        
        const selectedProduct = {
            userId : user ? user._id : session.user.id,
            productId
        }
        const duplicateWishlist = await Wishlist.findOne({
            userId : user ? user._id : session.user.id,
            productId
        })
        console.log(duplicateWishlist, 'duplkat');
        
        if(duplicateWishlist) {
            return
        }
        await Wishlist.insertOne(selectedProduct)
    } catch (error: any) {
        console.log(error.message)
        throw error
    }
}

export const deleteWishlist = async(req:NextRequest) => {
    try {
        const pathname = req.nextUrl.pathname
        const segments = pathname.split('/')
        
        const productId = new ObjectId(segments[3])
        
        const db = await connectToDatabase()
        const Wishlists = db.collection('Wishlists')
        
        const deleted = await Wishlists.deleteOne({productId})
        
        return deleted

    } catch (error) {
        throw error   
    }
}