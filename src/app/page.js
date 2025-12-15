
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
    <main className="flex justify-center items-center h-screen bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80')] bg-cover relative">
      <div className="text-center bg-black/60 p-12 rounded-2xl backdrop-blur-sm">
        <h1 className="text-5xl mb-4 font-extrabold text-white">Spotify Taste Mixer</h1>
        <p className="text-[#b3b3b3] mb-8">Descubre tus estadísticas musicales y crea playlists personalizadas.</p>
        <button onClick={handleLogin} className="bg-[#1DB954] text-black border-none py-4 px-8 rounded-[30px] font-bold text-xl cursor-pointer mt-8 transition-transform duration-200 hover:scale-105 hover:bg-[#1ed760]">
          Conectar con Spotify
        </button>
      </div>
    </main>
  );
}
