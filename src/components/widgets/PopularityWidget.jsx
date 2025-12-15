
'use client';

export default function PopularityWidget({ popularity = 50, onPopularityChange }) {

    const getLabel = (value) => {
        if (value < 50) return 'Underground / Niche (Obscure gems)';
        if (value < 80) return 'Popular (Well known)';
        return 'Mainstream (Top hits)';
    };

    return (
        <div className="widget popularity-widget">
            <h3>Mainstream Factor</h3>
            <div className="slider-container">
                <div className="value-display">
                    <span className="current-value">{popularity}%</span>
                    <span className="current-label">{getLabel(popularity)}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={popularity}
                    onChange={(e) => onPopularityChange(parseInt(e.target.value))}
                    className="slider"
                />
                <div className="range-labels">
                    <span>Obscure</span>
                    <span>Mainstream</span>
                </div>
            </div>
            <style jsx>{`
        .slider-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
        }
        .value-display {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        .current-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #1DB954;
        }
        .current-label {
            font-size: 0.9rem;
            color: #b3b3b3;
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
        .range-labels {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: #888;
        }
      `}</style>
        </div>
    );
}
