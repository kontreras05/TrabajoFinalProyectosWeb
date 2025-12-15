
import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex justify-between items-center p-8 bg-black sticky top-0 z-50">
            <div className="text-2xl font-bold">
                <Link href="/dashboard" className="text-white no-underline">Spotify Taste Mixer</Link>
            </div>
            <nav>
                <ul className="flex gap-6 list-none m-0 p-0 items-center">
                    <li><Link href="/dashboard" className="text-[#b3b3b3] no-underline transition-colors duration-300 hover:text-white">Panel</Link></li>
                    <li>
                        <button
                            className="bg-transparent border border-[#727272] text-white py-2 px-4 rounded-[20px] cursor-pointer font-bold transition-all duration-300 hover:border-white hover:scale-105"
                            onClick={() => {
                                localStorage.removeItem('spotify_access_token');
                                localStorage.removeItem('spotify_refresh_token');
                                window.location.href = '/';
                            }}
                        >
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
