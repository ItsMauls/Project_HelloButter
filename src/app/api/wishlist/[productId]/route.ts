
import { deleteWishlist } from "@/db/models/wishlist";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req : NextRequest):Promise<NextResponse> {
    try {
        const data = await deleteWishlist(req)
        
        return new NextResponse(JSON.stringify(`${data} has deleted successfully`), {status : 200})
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}