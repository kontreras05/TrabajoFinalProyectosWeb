
'use client';

import { useState, useEffect } from 'react';
import { searchArtists } from '@/lib/spotify';

export default function ArtistWidget({ onSelect, selectedItems = [] }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('spotify_access_token');
        setToken(storedToken);
    }, []);

    useEffect(() => {
        const fetchArtists = async () => {
            if (query.trim().length === 0 || !token) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const data = await searchArtists(query, token);
                if (data.artists) {
                    setResults(data.artists.items);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error("Error searching artists:", error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchArtists, 500);
        return () => clearTimeout(timeoutId);
    }, [query, token]);

    const handleSelect = (artist) => {
        if (selectedItems.find(item => item.id === artist.id)) {
            onSelect(selectedItems.filter(item => item.id !== artist.id));
        } else {
            if (selectedItems.length < 5) {
                onSelect([...selectedItems, artist]);
            }
        }
    };

    return (
        <div className="bg-[#181818] p-6 rounded-lg transition-colors duration-300 hover:bg-[#282828]">
            <h3 className="text-xl mb-4 text-white">Favorite Artists</h3>
            <input
                type="text"
                placeholder="Search artists..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 rounded border border-[#333] bg-[#222] text-white mb-4 placeholder-[#555]"
            />
            {loading && <p className="text-[#888] text-sm animate-pulse mb-2">Searching...</p>}
            <div className="max-h-[200px] overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {results.map(artist => {
                    const isSelected = selectedItems.some(item => item.id === artist.id);
                    return (
                        <div
                            key={artist.id}
                            className={`flex items-center p-2 cursor-pointer rounded transition-colors ${isSelected ? 'bg-[#1DB954] text-black font-semibold' : 'hover:bg-[#333]'}`}
                            onClick={() => handleSelect(artist)}
                        >
                            {artist.images[0] && (
                                <img src={artist.images[0].url} alt={artist.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                            )}
                            <span className="font-medium">{artist.name}</span>
                        </div>
                    );
                })}
            </div>
            <div className="">
                <h4 className="text-sm text-[#b3b3b3] mb-2 font-bold">Selected ({selectedItems.length}/5)</h4>
                <div className="flex flex-wrap gap-2">
                    {selectedItems.map(artist => (
                        <div key={artist.id} className="bg-[#333] px-2.5 py-1 rounded-[12px] flex items-center gap-2 text-xs text-white">
                            {artist.name}
                            <button onClick={() => handleSelect(artist)} className="bg-transparent border-none text-white cursor-pointer text-base leading-none hover:text-[#ff5555]">×</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
