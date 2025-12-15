
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
        <div className="bg-[#181818] p-6 rounded-lg transition-colors duration-300 hover:bg-[#282828]">
            <h3 className="text-xl mb-4 text-white">Favorite Genres</h3>
            <input
                type="text"
                placeholder="Search genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 rounded border border-[#333] bg-[#222] text-white mb-4 placeholder-[#555]"
            />

            <div className="mb-4">
                {selectedItems.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {selectedItems.map(genre => (
                            <div key={genre} className="bg-[#1DB954] text-black px-2.5 py-1 rounded-[12px] flex items-center gap-2 text-xs font-bold">
                                {genre}
                                <button onClick={() => handleSelect(genre)} className="bg-transparent border-none text-black cursor-pointer text-base leading-none hover:text-[#333]">×</button>
                            </div>
                        ))}
                    </div>
                )}
                <span className="block text-xs text-[#888] text-right mt-2">{selectedItems.length}/5 selected</span>
            </div>

            <div className="max-h-[200px] overflow-y-auto grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {filteredGenres.map(genre => {
                    const isSelected = selectedItems.includes(genre);
                    return (
                        <div
                            key={genre}
                            className={`p-2 bg-[#333] rounded cursor-pointer text-center transition-colors hover:bg-[#444] ${isSelected ? 'bg-[#1DB954] text-black font-bold' : ''}`}
                            onClick={() => handleSelect(genre)}
                        >
                            <span>{genre}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
