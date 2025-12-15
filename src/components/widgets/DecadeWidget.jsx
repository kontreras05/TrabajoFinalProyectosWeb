
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
        <div className="bg-[#181818] p-6 rounded-lg transition-colors duration-300 hover:bg-[#282828]">
            <h3 className="text-xl mb-4 text-white">Favorite Decades</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2.5 mt-4">
                {DECADES.map(decade => {
                    const isSelected = selectedItems.find(item => item.id === decade.id);
                    return (
                        <button
                            key={decade.id}
                            className={`p-2.5 rounded-[20px] cursor-pointer text-sm transition-all duration-200 border border-[#444] ${isSelected
                                    ? 'bg-[#1DB954] text-black border-[#1DB954] font-bold'
                                    : 'bg-[#333] text-[#b3b3b3] hover:bg-[#444] hover:text-white hover:scale-105'
                                }`}
                            onClick={() => handleSelect(decade)}
                        >
                            {decade.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
