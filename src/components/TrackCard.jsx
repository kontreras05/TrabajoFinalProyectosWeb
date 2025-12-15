
'use client';

export default function TrackCard({ track, onRemove, isFavorite, onToggleFavorite }) {
    if (!track) return null;

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        onToggleFavorite(track);
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        onRemove(track.id);
    };

    return (
        <div className="bg-white/5 p-3 rounded-xl transition-all duration-300 flex items-center gap-3 hover:bg-white/10 hover:shadow-lg hover:shadow-black/20 border border-transparent hover:border-white/5 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

            <div className="flex-shrink-0 relative">
                {track.album && track.album.images && track.album.images[0] && (
                    <img src={track.album.images[0].url} alt={track.name} className="w-[56px] h-[56px] object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg pointer-events-none">
                    <span className="text-white text-xs">▶</span>
                </div>
            </div>
            <div className="flex-1 overflow-hidden min-w-0">
                <h4 className="m-0 mb-0.5 text-white whitespace-nowrap overflow-hidden text-ellipsis font-bold text-sm group-hover:text-green-400 transition-colors">{track.name}</h4>
                <p className="m-0 text-gray-400 text-xs whitespace-nowrap overflow-hidden text-ellipsis mb-1">{track.artists.map(a => a.name).join(', ')}</p>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">{formatDuration(track.duration_ms)}</span>
                </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform translate-x-2 group-hover:translate-x-0">
                <button
                    className={`bg-transparent border-none text-[#b3b3b3] cursor-pointer text-xl transition-colors duration-200 p-0 w-8 h-8 flex justify-center items-center rounded-full hover:text-[#ffd700] hover:bg-white/10 ${isFavorite ? 'text-[#ffd700]' : ''}`}
                    onClick={handleFavoriteClick}
                    title={isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
                <button
                    className="bg-transparent border-none text-[#b3b3b3] cursor-pointer text-xl transition-colors duration-200 p-0 w-8 h-8 flex justify-center items-center rounded-full hover:text-[#ff5555] hover:bg-white/10"
                    onClick={handleRemoveClick}
                    title="Eliminar de la playlist"
                >
                    ×
                </button>
            </div>
        </div>
    );
}

function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
