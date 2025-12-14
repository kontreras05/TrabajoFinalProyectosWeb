
'use client';

import { getLoginUrl } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    const url = getLoginUrl();
    window.location.href = url;
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <h1>Spotify Taste Mixer</h1>
        <p>Discover your music stats and create custom playlists.</p>
        <button onClick={handleLogin} className="login-btn">
          Connect with Spotify
        </button>
      </div>
    </main>
  );
}
