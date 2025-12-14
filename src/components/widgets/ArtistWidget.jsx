
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
        <div className="widget artist-widget">
            <h3>Favorite Artists</h3>
            <input
                type="text"
                placeholder="Search artists..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="widget-search"
            />
            {loading && <p className="loading-text">Searching...</p>}
            <div className="results-list">
                {results.map(artist => {
                    const isSelected = selectedItems.some(item => item.id === artist.id);
                    return (
                        <div
                            key={artist.id}
                            className={`result-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSelect(artist)}
                        >
                            {artist.images[0] && (
                                <img src={artist.images[0].url} alt={artist.name} className="artist-img" />
                            )}
                            <span className="artist-name">{artist.name}</span>
                        </div>
                    );
                })}
            </div>
            <div className="selected-list">
                <h4>Selected ({selectedItems.length}/5)</h4>
                <div className="selected-items">
                    {selectedItems.map(artist => (
                        <div key={artist.id} className="selected-tag">
                            {artist.name}
                            <button onClick={() => handleSelect(artist)} className="remove-btn">×</button>
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
                .artist-img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                    object-fit: cover;
                }
                .artist-name {
                    font-weight: 500;
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
