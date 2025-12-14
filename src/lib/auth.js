
export const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const SCOPES = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played',
    'playlist-read-private',
    'playlist-read-collaborative'
].join(' ');

export const getLoginUrl = () => {
    const state = generateRandomString(16);
    // Ensure we are in a browser environment
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('spotify_auth_state', state);
    }

    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    const params = new URLSearchParams({
        response_type: 'code',
        client_id,
        scope: SCOPES,
        redirect_uri,
        state
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
};
