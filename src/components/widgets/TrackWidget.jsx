
'use client';

import { useState, useEffect } from 'react';
import { searchTracks } from '@/lib/spotify';

export default function TrackWidget({ onSelect, selectedItems = [] }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('spotify_access_token');
        setToken(storedToken);
    }, []);

    useEffect(() => {
        const fetchTracks = async () => {
            if (query.trim().length === 0 || !token) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const data = await searchTracks(query, token);
                if (data.tracks) {
                    setResults(data.tracks.items);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error("Error searching tracks:", error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchTracks, 500);
        return () => clearTimeout(timeoutId);
    }, [query, token]);

    const handleSelect = (track) => {
        const alreadySelected = selectedItems.find(item => item.id === track.id);
        if (alreadySelected) {
            onSelect(selectedItems.filter(item => item.id !== track.id));
        } else {
            // Optional: Limit track selection if needed
            if (selectedItems.length < 10) {
                onSelect([...selectedItems, track]);
            }
        }
    };

    return (
        <div className="bg-[#181818] p-6 rounded-lg transition-colors duration-300 hover:bg-[#282828]">
            <h3 className="text-xl mb-4 text-white">Favorite Tracks</h3>
            <input
                type="text"
                placeholder="Search tracks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 rounded border border-[#333] bg-[#222] text-white mb-4 placeholder-[#555]"
            />
            {loading && <p className="text-[#888] text-sm animate-pulse mb-2">Searching...</p>}
            <div className="max-h-[200px] overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {results.map(track => {
                    const isSelected = selectedItems.some(item => item.id === track.id);
                    return (
                        <div
                            key={track.id}
                            className={`flex items-center p-2 cursor-pointer rounded transition-colors ${isSelected ? 'bg-[#1DB954] text-black font-semibold' : 'hover:bg-[#333]'}`}
                            onClick={() => handleSelect(track)}
                        >
                            {track.album.images[0] && (
                                <img src={track.album.images[0].url} alt={track.name} className="w-10 h-10 rounded mr-3 object-cover" />
                            )}
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{track.name}</span>
                                <span className="text-xs opacity-80">{track.artists.map(a => a.name).join(', ')}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="">
                <h4 className="text-sm text-[#b3b3b3] mb-2 font-bold">Selected ({selectedItems.length})</h4>
                <div className="flex flex-wrap gap-2">
                    {selectedItems.map(track => (
                        <div key={track.id} className="bg-[#333] px-2.5 py-1 rounded-[12px] flex items-center gap-2 text-xs text-white">
                            {track.name}
                            <button onClick={() => handleSelect(track)} className="bg-transparent border-none text-white cursor-pointer text-base leading-none hover:text-[#ff5555]">×</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
