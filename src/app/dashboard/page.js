
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

import { generatePlaylist } from '@/lib/playlist-generator';

export default function Dashboard() {
    const [token, setToken] = useState(null);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [selectedDecades, setSelectedDecades] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [mood, setMood] = useState({ energy: 50, happiness: 50, danceability: 50 });
    const [popularity, setPopularity] = useState(50);

    const [playlist, setPlaylist] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('spotify_access_token');
        if (!storedToken) {
            router.push('/');
        } else {
            setToken(storedToken);
            // Load favorites from local storage
            const savedFavorites = JSON.parse(localStorage.getItem('favorite_tracks') || '[]');
            setFavorites(savedFavorites);
        }
    }, [router]);

    const handleGeneratePlaylist = async () => {
        setIsGenerating(true);
        const preferences = {
            artists: selectedArtists,
            genres: selectedGenres,
            tracks: selectedTracks,
            decades: selectedDecades,
            mood: mood,
            popularity: popularity
        };

        try {
            const tracks = await generatePlaylist(preferences, token);
            setPlaylist(tracks);
        } catch (error) {
            console.error("Failed to generate playlist", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const removeTrack = (trackId) => {
        setPlaylist(playlist.filter(track => track.id !== trackId));
    };

    const toggleFavorite = (track) => {
        let updatedFavorites;
        if (favorites.some(f => f.id === track.id)) {
            updatedFavorites = favorites.filter(f => f.id !== track.id);
        } else {
            updatedFavorites = [...favorites, track];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorite_tracks', JSON.stringify(updatedFavorites));
    };

    const handleSavePlaylist = async () => {
        if (!playlist || playlist.length === 0) return;
        setIsSaving(true);
        try {
            const { getCurrentUser, createPlaylist, addTracksToPlaylist } = await import('@/lib/spotify');
            const user = await getCurrentUser(token);
            if (!user || !user.id) throw new Error('No se pudo obtener el perfil de usuario');

            const playlistData = await createPlaylist(user.id, 'Mi Playlist de Taste Mixer', token);
            if (!playlistData || !playlistData.id) throw new Error('No se pudo crear la playlist');

            const uris = playlist.map(track => track.uri);
            await addTracksToPlaylist(playlistData.id, uris, token);

            alert('¡Playlist guardada en Spotify!');
        } catch (error) {
            console.error('Failed to save playlist:', error);
            if (error.message.includes('401') || error.message.includes('403')) {
                alert('Sesión expirada o permisos insuficientes. Por favor, cierra sesión e inicia sesión nuevamente.');
            } else {
                alert(`Error al guardar la playlist: ${error.message}`);
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (!token) return null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#121212] via-[#000000] to-[#121212] text-white">
            <Header />
            <main className="p-8 max-w-[1400px] mx-auto animate-fade-in">
                <header className="mb-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600 mb-2">Tu Mezclador de Gustos</h2>
                    <p className="text-gray-400 text-lg">Cura, descubre y guarda tu vibra perfecta.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                    <DecadeWidget
                        selectedItems={selectedDecades}
                        onSelect={setSelectedDecades}
                    />
                    <MoodWidget
                        mood={mood}
                        onMoodChange={setMood}
                    />
                    <PopularityWidget
                        popularity={popularity}
                        onPopularityChange={setPopularity}
                    />
                </div>
                <section className="">
                    <PlaylistDisplay
                        tracks={playlist}
                        onRemoveTrack={removeTrack}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                        onGenerate={handleGeneratePlaylist}
                        isGenerating={isGenerating}
                        onSave={handleSavePlaylist}
                        isSaving={isSaving}
                    />
                </section>
            </main>
        </div>
    );
}
