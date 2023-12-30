'use server'
import DetailCard from "@/components/DetailCard"
import DetailProductSkeleton from "@/components/DetailProductSkeleton"

import Product from "@/db/models/products"
import { ResolvingMetadata } from "next"    

    type Props = {
    params: { slug: string };
    };

const getProductBySlug = async(slug : string):Promise<Product> => {
    const BASE_URL =  'https://mauproject-hellobutter.vercel.app'
    const response = await fetch(`${BASE_URL}/api/products/${slug}`)
    return await response.json()
}

export async function generateMetadata (
    {params} : Props,
    parent : ResolvingMetadata
    ) {
    const {slug} = params
    const productBySlug = await getProductBySlug(slug)
    const previousImages = (await parent).openGraph?.images  || []
    return {
        title: productBySlug.name,
        description : productBySlug.excerpt,
        openGraph: {
          images: [productBySlug.images[0], ...previousImages],
        },
      };
}

const ProductDetail = async({ params }: Props) => {
    const {slug} = params
    const detailProduct = await getProductBySlug(slug)
    
    return (
        <>
            < DetailCard key={detailProduct._id.toString()} detailProduct={detailProduct} />
        
        </>
    )
}

export default ProductDetail