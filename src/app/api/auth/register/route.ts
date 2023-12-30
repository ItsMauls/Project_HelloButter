
import { NextRequest, NextResponse } from 'next/server';

import { register } from '@/db/models/users';

export async function POST(req: NextRequest) {
    try {
        const res = await register(req)
        return NextResponse.json({ message: res }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
