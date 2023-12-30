import { NextRequest, NextResponse } from "next/server";

import { searchedProducts } from "@/db/models/products";

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const response = await searchedProducts(req)

        return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}