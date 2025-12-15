
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
        <div className="widget track-widget">
            <h3>Favorite Tracks</h3>
            <input
                type="text"
                placeholder="Search tracks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="widget-search"
            />
            {loading && <p className="loading-text">Searching...</p>}
            <div className="results-list">
                {results.map(track => {
                    const isSelected = selectedItems.some(item => item.id === track.id);
                    return (
                        <div
                            key={track.id}
                            className={`result-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSelect(track)}
                        >
                            {track.album.images[0] && (
                                <img src={track.album.images[0].url} alt={track.name} className="track-img" />
                            )}
                            <div className="track-info-widget">
                                <span className="track-name">{track.name}</span>
                                <span className="track-artist">{track.artists.map(a => a.name).join(', ')}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="selected-list">
                <h4>Selected ({selectedItems.length})</h4>
                <div className="selected-items">
                    {selectedItems.map(track => (
                        <div key={track.id} className="selected-tag">
                            {track.name}
                            <button onClick={() => handleSelect(track)} className="remove-btn">×</button>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .widget-search {
                    width: 100%;
                    padding: 0.5rem;
                    border-radius: 4px;
                    border: 1px solid #333;
                    background: #222;
                    color: white;
                    margin-bottom: 1rem;
                }
                 .results-list {
                    max-height: 200px;
                    overflow-y: auto;
                    margin-bottom: 1rem;
                }
                .result-item {
                    display: flex;
                    align-items: center;
                    padding: 0.5rem;
                    cursor: pointer;
                    border-radius: 4px;
                }
                 .result-item:hover {
                    background: #333;
                }
                .result-item.selected {
                     background: #1DB954;
                     color: black;
                }
                .track-img {
                    width: 40px;
                    height: 40px;
                    border-radius: 4px;
                    margin-right: 10px;
                    object-fit: cover;
                }
                .track-info-widget {
                    display: flex;
                    flex-direction: column;
                }
                .track-name {
                    font-weight: 500;
                    font-size: 0.9rem;
                }
                .track-artist {
                    font-size: 0.8rem;
                    color: inherit;
                    opacity: 0.8;
                }
                 .selected-items {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                .selected-tag {
                    background: #333;
                    padding: 0.2rem 0.6rem;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.8rem;
                }
                .remove-btn {
                    background: none;
                    border: none;
                    color: #fff;
                    cursor: pointer;
                    font-size: 1rem;
                }
                .remove-btn:hover {
                    color: #ff5555;
                }
            `}</style>
        </div>
    );
}
