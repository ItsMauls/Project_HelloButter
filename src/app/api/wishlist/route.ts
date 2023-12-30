
import { getWishlist } from "@/db/models/wishlist";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest):Promise<NextResponse> {
    try {
        const response = await getWishlist()

        return new NextResponse(JSON.stringify(response), {status : 200})
    } catch (error) {
        throw error
        // return new NextResponse(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}
