
import Link from 'next/link';

export default function Header() {
    return (
        <header className="app-header">
            <div className="logo">
                <Link href="/dashboard">Spotify Taste Mixer</Link>
            </div>
            <nav>
                <ul>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><button className="logout-btn">Logout</button></li>
                </ul>
            </nav>
        </header>
    );
}
