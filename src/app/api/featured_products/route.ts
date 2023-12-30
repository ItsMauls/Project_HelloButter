
import { getFeaturedProducts } from "@/db/models/products";

import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
    try {
       const response = await getFeaturedProducts()

        return new NextResponse(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
            
    } catch (error) {
        throw error
    }
    
}