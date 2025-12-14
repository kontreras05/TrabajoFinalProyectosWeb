
'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Callback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const called = useRef(false);

    const state = searchParams.get('state');

    useEffect(() => {
        if (code && state && !called.current) {
            called.current = true;

            const storedState = sessionStorage.getItem('spotify_auth_state');
            if (!state || state !== storedState) {
                console.error('State mismatch');
                router.push('/');
                return;
            }
            sessionStorage.removeItem('spotify_auth_state');

            const exchangeToken = async () => {
                try {
                    const res = await fetch('/api/spotify-token', {
                        method: 'POST',
                        body: JSON.stringify({
                            code,
                            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await res.json();
                    if (data.access_token) {
                        localStorage.setItem('spotify_access_token', data.access_token);
                        if (data.refresh_token) {
                            localStorage.setItem('spotify_refresh_token', data.refresh_token);
                        }
                        router.push('/dashboard');
                    } else {
                        console.error('Failed to get token', data);
                        router.push('/');
                    }
                } catch (err) {
                    console.error('Error exchanging token', err);
                    router.push('/');
                }
            };
            exchangeToken();
        }
    }, [code, state, router]);

    return (
        <div className="callback-page">
            <p>Authenticating...</p>
        </div>
    );
}
