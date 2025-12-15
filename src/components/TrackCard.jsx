
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
        <div className="bg-[#181818] p-4 rounded-lg transition-colors duration-300 flex items-center gap-4 hover:bg-[#282828]">
            <div className="flex-shrink-0">
                {track.album && track.album.images && track.album.images[0] && (
                    <img src={track.album.images[0].url} alt={track.name} className="w-[60px] h-[60px] object-cover rounded" />
                )}
            </div>
            <div className="flex-1 overflow-hidden">
                <h4 className="m-0 mb-1 text-white whitespace-nowrap overflow-hidden text-ellipsis font-bold">{track.name}</h4>
                <p className="m-0 text-[#b3b3b3] text-sm whitespace-nowrap overflow-hidden text-ellipsis">{track.artists.map(a => a.name).join(', ')}</p>
                <p className="m-0 text-[#777] text-xs mt-0.5">{formatDuration(track.duration_ms)}</p>
            </div>
            <div className="flex gap-2">
                <button
                    className={`bg-transparent border-none text-[#b3b3b3] cursor-pointer text-xl transition-colors duration-200 p-0 w-8 h-8 flex justify-center items-center rounded-full hover:text-[#ffd700] hover:bg-white/10 ${isFavorite ? 'text-[#ffd700]' : ''}`}
                    onClick={handleFavoriteClick}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
                <button
                    className="bg-transparent border-none text-[#b3b3b3] cursor-pointer text-xl transition-colors duration-200 p-0 w-8 h-8 flex justify-center items-center rounded-full hover:text-[#ff5555] hover:bg-white/10"
                    onClick={handleRemoveClick}
                    title="Remove from playlist"
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
