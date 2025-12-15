
'use client';

export default function MoodWidget({ mood, onMoodChange }) {
    const handleChange = (feature, value) => {
        onMoodChange({ ...mood, [feature]: parseInt(value) });
    };

    const defaultMood = {
        energy: 50,
        happiness: 50,
        danceability: 50
    };

    const currentMood = mood || defaultMood;

    return (
        <div className="bg-[#181818]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-green-900/10 group h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                <span className="text-green-500">⚡</span> Estado de Ánimo y Energía
            </h3>
            <div className="flex flex-col gap-8 mt-2">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-sm font-semibold text-white items-end">
                        <label className="text-gray-300">Energía</label>
                        <span className="text-green-500 text-lg">{currentMood.energy}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={currentMood.energy}
                        onChange={(e) => handleChange('energy', e.target.value)}
                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-all"
                    />
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                        <span>Calma</span>
                        <span>Intenso</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-sm font-semibold text-white items-end">
                        <label className="text-gray-300">Felicidad</label>
                        <span className="text-green-500 text-lg">{currentMood.happiness}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={currentMood.happiness}
                        onChange={(e) => handleChange('happiness', e.target.value)}
                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-all"
                    />
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                        <span>Triste</span>
                        <span>Feliz</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-sm font-semibold text-white items-end">
                        <label className="text-gray-300">Bailabilidad</label>
                        <span className="text-green-500 text-lg">{currentMood.danceability}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={currentMood.danceability}
                        onChange={(e) => handleChange('danceability', e.target.value)}
                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-all"
                    />
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                        <span>Relajado</span>
                        <span>Bailable</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
