
import { getAccessToken } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { refresh_token } = await request.json();

    if (!refresh_token) {
        return NextResponse.json({ error: 'Missing refresh_token' }, { status: 400 });
    }

    try {
        const data = await getAccessToken(refresh_token);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to refresh token' }, { status: 500 });
    }
}
