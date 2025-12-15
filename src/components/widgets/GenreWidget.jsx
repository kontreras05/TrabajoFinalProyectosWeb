
'use client';

import { useState } from 'react';

const ALL_GENRES = [
    'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 'black-metal', 'bluegrass', 'blues', 'bossanova',
    'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical', 'club', 'comedy',
    'country', 'dance', 'dancehall', 'death-metal', 'deep-house', 'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub',
    'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro', 'french', 'funk', 'garage', 'german', 'gospel', 'goth',
    'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore', 'hardstyle', 'heavy-metal', 'hip-hop', 'house',
    'idm', 'indian', 'indie', 'indie-pop', 'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz', 'k-pop',
    'kids', 'latin', 'latino', 'malay', 'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno', 'movies', 'mpb',
    'new-age', 'new-release', 'opera', 'pagode', 'party', 'philippines-opm', 'piano', 'pop', 'pop-film', 'post-dubstep',
    'power-pop', 'progressive-house', 'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae', 'reggaeton',
    'road-trip', 'rock', 'rock-n-roll', 'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'show-tunes',
    'singer-songwriter', 'ska', 'sleep', 'songwriter', 'soul', 'soundtracks', 'spanish', 'study', 'summer', 'swedish',
    'synth-pop', 'tango', 'techno', 'trance', 'trip-hop', 'turkish', 'work-out', 'world-music'
];

export default function GenreWidget({ onSelect, selectedItems = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGenres = ALL_GENRES.filter(genre =>
        genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (genre) => {
        if (selectedItems.includes(genre)) {
            onSelect(selectedItems.filter(item => item !== genre));
        } else {
            if (selectedItems.length < 5) {
                onSelect([...selectedItems, genre]);
            }
        }
    };

    return (
        <div className="widget genre-widget">
            <h3>Favorite Genres</h3>
            <input
                type="text"
                placeholder="Search genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="widget-search"
            />

            <div className="selected-list">
                {selectedItems.length > 0 && (
                    <div className="selected-items">
                        {selectedItems.map(genre => (
                            <div key={genre} className="selected-tag">
                                {genre}
                                <button onClick={() => handleSelect(genre)} className="remove-btn">×</button>
                            </div>
                        ))}
                    </div>
                )}
                <span className="limit-info">{selectedItems.length}/5 selected</span>
            </div>

            <div className="results-list">
                {filteredGenres.map(genre => {
                    const isSelected = selectedItems.includes(genre);
                    return (
                        <div
                            key={genre}
                            className={`result-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSelect(genre)}
                        >
                            <span className="genre-name">{genre}</span>
                        </div>
                    );
                })}
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
        .selected-list {
            margin-bottom: 1rem;
        }
        .results-list {
            max-height: 200px;
            overflow-y: auto;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 0.5rem;
        }
        .result-item {
            padding: 0.5rem;
            background: #333;
            border-radius: 4px;
            cursor: pointer;
            text-align: center;
            transition: background 0.2s;
        }
        .result-item:hover {
            background: #444;
        }
        .result-item.selected {
            background: #1DB954;
            color: black;
            font-weight: bold;
        }
        .limit-info {
            display: block;
            font-size: 0.8rem;
            color: #888;
            margin-top: 0.5rem;
            text-align: right;
        }
        .selected-items {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .selected-tag {
            background: #1DB954;
            color: black;
            padding: 0.2rem 0.6rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
            font-weight: bold;
        }
        .remove-btn {
            background: none;
            border: none;
            color: black;
            cursor: pointer;
            font-size: 1rem;
            line-height: 1;
        }
        .remove-btn:hover {
            color: #333;
        }
      `}</style>
        </div>
    );
}
