
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
        <div className="bg-[#181818]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-green-900/10 group h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <span className="text-green-500">📅</span> Favorite Decades
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-3 mt-4">
                {DECADES.map(decade => {
                    const isSelected = selectedItems.find(item => item.id === decade.id);
                    return (
                        <button
                            key={decade.id}
                            className={`py-3 px-2 rounded-xl cursor-pointer text-sm font-bold transition-all duration-300 border ${isSelected
                                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-400 shadow-lg shadow-green-500/30 transform scale-105'
                                    : 'bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:border-white/10 hover:text-white hover:scale-105'
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
