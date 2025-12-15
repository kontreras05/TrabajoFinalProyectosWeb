
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
        <div className="bg-[#181818] p-6 rounded-lg transition-colors duration-300 hover:bg-[#282828]">
            <h3 className="text-xl mb-4 text-white">Mood & Energy</h3>
            <div className="flex flex-col gap-6 mt-4">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm font-medium text-white">
                        <label>Energy</label>
                        <span>{currentMood.energy}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={currentMood.energy}
                        onChange={(e) => handleChange('energy', e.target.value)}
                        className="w-full h-1.5 bg-[#444] rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
                    />
                    <div className="flex justify-between text-xs text-[#888]">
                        <span>Calm</span>
                        <span>Intense</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm font-medium text-white">
                        <label>Happiness</label>
                        <span>{currentMood.happiness}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={currentMood.happiness}
                        onChange={(e) => handleChange('happiness', e.target.value)}
                        className="w-full h-1.5 bg-[#444] rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
                    />
                    <div className="flex justify-between text-xs text-[#888]">
                        <span>Sad</span>
                        <span>Happy</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm font-medium text-white">
                        <label>Danceability</label>
                        <span>{currentMood.danceability}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={currentMood.danceability}
                        onChange={(e) => handleChange('danceability', e.target.value)}
                        className="w-full h-1.5 bg-[#444] rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
                    />
                    <div className="flex justify-between text-xs text-[#888]">
                        <span>Chill</span>
                        <span>Dance</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
