
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
        <div className="bg-[#181818]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-green-900/10 group h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <span className="text-green-500">🎹</span> Géneros Favoritos
            </h3>
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Buscar géneros..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-4 rounded-full border border-transparent bg-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-[#333] transition-all"
                />
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm text-gray-400 font-bold uppercase tracking-wider">Seleccionados</h4>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">{selectedItems.length}/5</span>
                </div>
                {selectedItems.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {selectedItems.map(genre => (
                            <div key={genre} className="bg-gradient-to-r from-green-600 to-green-500 shadow-lg shadow-green-900/20 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-white font-bold">
                                {genre}
                                <button onClick={() => handleSelect(genre)} className="bg-black/20 hover:bg-black/40 rounded-full w-4 h-4 flex items-center justify-center text-white transition-colors">×</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-sm italic py-1">No hay géneros seleccionados</p>
                )}
            </div>

            <div className="max-h-[250px] overflow-y-auto grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
                {filteredGenres.map(genre => {
                    const isSelected = selectedItems.includes(genre);
                    return (
                        <div
                            key={genre}
                            className={`px-2 py-2 rounded-lg cursor-pointer text-center text-xs font-medium transition-all duration-200 border ${isSelected ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/5 text-gray-300 hover:bg-white/10 border-transparent hover:border-white/5'}`}
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
