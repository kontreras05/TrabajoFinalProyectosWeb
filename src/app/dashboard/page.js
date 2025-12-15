
'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ArtistWidget from '@/components/widgets/ArtistWidget';
import GenreWidget from '@/components/widgets/GenreWidget';
import DecadeWidget from '@/components/widgets/DecadeWidget';
import MoodWidget from '@/components/widgets/MoodWidget';
import PopularityWidget from '@/components/widgets/PopularityWidget';
import TrackWidget from '@/components/widgets/TrackWidget';
import PlaylistDisplay from '@/components/PlaylistDisplay';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [token, setToken] = useState(null);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('spotify_access_token');
        if (!storedToken) {
            router.push('/');
        } else {
            setToken(storedToken);
        }
    }, [router]);

    if (!token) return null;

    return (
        <div className="dashboard-page">
            <Header />
            <main className="dashboard-content">
                <h2>Your Taste Overview</h2>
                <div className="widgets-grid">
                    <ArtistWidget
                        selectedItems={selectedArtists}
                        onSelect={setSelectedArtists}
                    />
                    <GenreWidget
                        selectedItems={selectedGenres}
                        onSelect={setSelectedGenres}
                    />
                    <TrackWidget
                        selectedItems={selectedTracks}
                        onSelect={setSelectedTracks}
                    />
                    <DecadeWidget />
                    <MoodWidget />
                    <PopularityWidget />
                </div>
                <section className="playlist-section">
                    <PlaylistDisplay tracks={[]} />
                </section>
            </main>
        </div>
    );
}
