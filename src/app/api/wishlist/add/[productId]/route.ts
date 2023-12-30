import { NextRequest, NextResponse } from "next/server";

import { addWishlist } from "@/db/models/wishlist";

export async function POST(req : NextRequest):Promise<NextResponse> {
    try {
        await addWishlist(req)
        
        return new NextResponse(JSON.stringify({message : 'Success Add Products'}), {status : 201})
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}