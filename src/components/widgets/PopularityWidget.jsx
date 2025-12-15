
'use client';

export default function PopularityWidget({ popularity = 50, onPopularityChange }) {

    const getLabel = (value) => {
        if (value < 50) return 'Underground / Nicho (Joyas ocultas)';
        if (value < 80) return 'Popular (Conocido)';
        return 'Mainstream (Éxitos)';
    };

    return (
        <div className="bg-[#181818]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-green-900/10 group h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <span className="text-green-500">🔥</span> Factor Mainstream
            </h3>
            <div className="flex flex-col gap-6 mt-4 flex-1 justify-center">
                <div className="flex flex-col items-center mb-2">
                    <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600 drop-shadow-lg">{popularity}%</span>
                    <span className="text-sm font-medium text-gray-400 mt-2 bg-white/5 px-3 py-1 rounded-full">{getLabel(popularity)}</span>
                </div>
                <div className="px-2">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={popularity}
                        onChange={(e) => onPopularityChange(parseInt(e.target.value))}
                        className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-all shadow-inner"
                    />
                    <div className="flex justify-between text-xs text-gray-500 font-medium mt-2">
                        <span className="hover:text-white transition-colors">Oscuro</span>
                        <span className="hover:text-white transition-colors">Mainstream</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
