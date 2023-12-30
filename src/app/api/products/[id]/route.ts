import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/db/models/products";

export async function GET (req: NextRequest) {
    try {
        const response = await getProductBySlug(req)
        
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