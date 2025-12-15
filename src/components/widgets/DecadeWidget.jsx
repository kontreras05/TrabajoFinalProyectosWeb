
'use client';

const DECADES = [
    { label: '1950s', id: '1950-1959' },
    { label: '1960s', id: '1960-1969' },
    { label: '1970s', id: '1970-1979' },
    { label: '1980s', id: '1980-1989' },
    { label: '1990s', id: '1990-1999' },
    { label: '2000s', id: '2000-2009' },
    { label: '2010s', id: '2010-2019' },
    { label: '2020s', id: '2020-2029' },
];

export default function DecadeWidget({ onSelect, selectedItems = [] }) {
    const handleSelect = (decade) => {
        const isSelected = selectedItems.find(item => item.id === decade.id);
        if (isSelected) {
            onSelect(selectedItems.filter(item => item.id !== decade.id));
        } else {
            onSelect([...selectedItems, decade]);
        }
    };

    return (
        <div className="widget decade-widget">
            <h3>Favorite Decades</h3>
            <div className="decades-grid">
                {DECADES.map(decade => {
                    const isSelected = selectedItems.find(item => item.id === decade.id);
                    return (
                        <button
                            key={decade.id}
                            className={`decade-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSelect(decade)}
                        >
                            {decade.label}
                        </button>
                    );
                })}
            </div>
            <style jsx>{`
        .decades-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            gap: 10px;
            margin-top: 1rem;
        }
        .decade-btn {
            background: #333;
            border: 1px solid #444;
            color: #b3b3b3;
            padding: 10px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
        }
        .decade-btn:hover {
            background: #444;
            color: white;
            transform: scale(1.05);
        }
        .decade-btn.selected {
            background: #1DB954;
            color: black;
            border-color: #1DB954;
            font-weight: bold;
        }
      `}</style>
        </div>
    );
}
