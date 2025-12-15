
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
        <div className="bg-[#181818]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-green-900/10 group h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <span className="text-green-500">🎵</span> Favorite Tracks
            </h3>
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search tracks..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-3 pl-4 rounded-full border border-transparent bg-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-[#333] transition-all"
                />
            </div>
            {loading && <p className="text-[#888] text-sm animate-pulse mb-2">Searching...</p>}
            <div className="max-h-[250px] overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
                {results.map(track => {
                    const isSelected = selectedItems.some(item => item.id === track.id);
                    return (
                        <div
                            key={track.id}
                            className={`flex items-center p-3 mb-2 cursor-pointer rounded-xl transition-all duration-200 ${isSelected ? 'bg-green-500/20 text-white border border-green-500/30' : 'bg-white/5 hover:bg-white/10 border border-transparent'}`}
                            onClick={() => handleSelect(track)}
                        >
                            {track.album.images[0] ? (
                                <img src={track.album.images[0].url} alt={track.name} className="w-12 h-12 rounded-lg mr-3 object-cover shadow-sm" />
                            ) : (
                                <div className="w-12 h-12 rounded-lg mr-3 bg-gray-700 flex items-center justify-center text-xs">?</div>
                            )}
                            <div className="flex flex-col overflow-hidden">
                                <span className={`text-sm font-semibold truncate ${isSelected ? 'text-green-400' : 'text-white'}`}>{track.name}</span>
                                <span className="text-xs text-gray-400 truncate">{track.artists.map(a => a.name).join(', ')}</span>
                            </div>
                            {isSelected && <span className="ml-auto text-green-500 text-lg">✓</span>}
                        </div>
                    );
                })}
            </div>
            <div className="mt-auto">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm text-gray-400 font-bold uppercase tracking-wider">Selected</h4>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">{selectedItems.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {selectedItems.map(track => (
                        <div key={track.id} className="bg-gradient-to-r from-green-600 to-green-500 shadow-lg shadow-green-900/20 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-white font-bold animate-pulse-once">
                            <span className="truncate max-w-[100px]">{track.name}</span>
                            <button onClick={(e) => { e.stopPropagation(); handleSelect(track); }} className="bg-black/20 hover:bg-black/40 rounded-full w-4 h-4 flex items-center justify-center text-white transition-colors">×</button>
                        </div>
                    ))}
                    {selectedItems.length === 0 && <p className="text-gray-600 text-sm italic w-full text-center py-2">No tracks selected yet</p>}
                </div>
            </div>
        </div>
    );
}
