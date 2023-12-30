import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/db/models/products";

export async function GET (req: NextRequest) {
    try {
        const response = await getProducts(req)

        return new NextResponse(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });
            
    } catch (error) {
        throw error
    }  
}