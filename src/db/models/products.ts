import { Collection, ObjectId, WithId } from "mongodb"
import { connectToDatabase } from "../config/db"
import { NextRequest, NextResponse } from "next/server"

export default interface Product {
    _id : ObjectId
    name : string
    slug : string
    description : string
    excerpt : string
    price : number
    tags : string[]
    thumbnail : string
    images : string[]
    createdAt : Date
    updatedAt : Date

}

export const getFeaturedProducts = async() => {
    try {
        const db = await connectToDatabase()
        const Products = db.collection('Products')    
        
        const response = await Products
        .find()
        .limit(8)
        .toArray()

        return response
    } catch (error) {
        throw error
    }
}

export const getProducts = async(req: NextRequest) => {
    try {
        // const url = new URL(req.url)
        
        // const startParam = url.searchParams.get('start')
        // const limitParam = url.searchParams.get('limit')

        // const start = startParam ? parseInt(startParam, 10) : 0;
        // const limit = limitParam ? parseInt(limitParam, 10) : 10;

        const db = await connectToDatabase()
        const Products : Collection<Document> = db.collection('Products')
        const response = await Products
        .find()
        .sort({createdAt : -1})
        .skip(0)
        .limit(10)
        .toArray()

        return response

    } catch (error) {
        throw error
    }
}

export const getProductBySlug = async(req: NextRequest) => {
    try {
        const url = new URL(req.url)
    
        const pathname = url.pathname
        const segments = pathname.split('/')
        const slug = segments[3] as string
        
        
        const db = await connectToDatabase()
        const Products = db.collection('Products')

        const response = await Products
        .findOne({slug})

        return response
        
    } catch (error) {
        throw error
    }
}

export const searchedProducts = async(req: NextRequest) => {
    try {
        const searchParam = req.nextUrl.searchParams.get('input');
        
        if (!searchParam) {
            return new NextResponse(JSON.stringify({ message: "Search query is required" }), { status: 400 });
        }

        const regex = new RegExp(searchParam, 'i');
        const db = await connectToDatabase();
        const Products: Collection<WithId<Product>> = db.collection('Products');

        const searchedProducts: WithId<Product>[] = await Products.find({ name: { $regex: regex } }).toArray();
        
        return searchedProducts
    } catch (error) {
        throw error
    }
}