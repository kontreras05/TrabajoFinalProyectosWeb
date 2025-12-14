
import { exchangeCodeForToken } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { code, redirect_uri } = await request.json();

    if (!code || !redirect_uri) {
        return NextResponse.json({ error: 'Missing code or redirect_uri' }, { status: 400 });
    }

    try {
        const data = await exchangeCodeForToken(code, redirect_uri);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to exchange token' }, { status: 500 });
    }
}
