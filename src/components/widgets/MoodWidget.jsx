
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
        <div className="widget mood-widget">
            <h3>Mood & Energy</h3>
            <div className="sliders-container">
                <div className="slider-group">
                    <div className="slider-header">
                        <label>Energy</label>
                        <span>{currentMood.energy}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={currentMood.energy}
                        onChange={(e) => handleChange('energy', e.target.value)}
                        className="slider energy-slider"
                    />
                    <div className="labels">
                        <span>Calm</span>
                        <span>Intense</span>
                    </div>
                </div>

                <div className="slider-group">
                    <div className="slider-header">
                        <label>Happiness</label>
                        <span>{currentMood.happiness}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={currentMood.happiness}
                        onChange={(e) => handleChange('happiness', e.target.value)}
                        className="slider happiness-slider"
                    />
                    <div className="labels">
                        <span>Sad</span>
                        <span>Happy</span>
                    </div>
                </div>

                <div className="slider-group">
                    <div className="slider-header">
                        <label>Danceability</label>
                        <span>{currentMood.danceability}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={currentMood.danceability}
                        onChange={(e) => handleChange('danceability', e.target.value)}
                        className="slider danceability-slider"
                    />
                    <div className="labels">
                        <span>Chill</span>
                        <span>Dance</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .sliders-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-top: 1rem;
        }
        .slider-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .slider-header {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            font-weight: 500;
            color: #fff;
        }
        .slider {
            -webkit-appearance: none;
            width: 100%;
            height: 6px;
            background: #444;
            border-radius: 3px;
            outline: none;
        }
        .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #1DB954;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
        }
        .labels {
            display: flex;
            justify-content: space-between;
            font-size: 0.75rem;
            color: #888;
        }
      `}</style>
        </div>
    );
}
