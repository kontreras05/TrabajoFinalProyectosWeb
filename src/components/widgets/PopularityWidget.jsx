
'use client';

export default function PopularityWidget({ popularity = 50, onPopularityChange }) {

    const getLabel = (value) => {
        if (value < 50) return 'Underground / Niche (Obscure gems)';
        if (value < 80) return 'Popular (Well known)';
        return 'Mainstream (Top hits)';
    };

    return (
        <div className="bg-[#181818] p-6 rounded-lg transition-colors duration-300 hover:bg-[#282828]">
            <h3 className="text-xl mb-4 text-white">Mainstream Factor</h3>
            <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col items-center mb-2">
                    <span className="text-2xl font-bold text-[#1DB954]">{popularity}%</span>
                    <span className="text-sm text-[#b3b3b3]">{getLabel(popularity)}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={popularity}
                    onChange={(e) => onPopularityChange(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#444] rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
                />
                <div className="flex justify-between text-xs text-[#888]">
                    <span>Obscure</span>
                    <span>Mainstream</span>
                </div>
            </div>
        </div>
    );
}
