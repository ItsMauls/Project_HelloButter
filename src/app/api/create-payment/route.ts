import { createPayment } from "@/db/models/payment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const response = await createPayment(req)
        return new NextResponse(JSON.stringify(response), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        throw error 
    }
}