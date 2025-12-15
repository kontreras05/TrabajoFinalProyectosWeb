
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
        <div className="track-card">
            <div className="track-img-container">
                {track.album && track.album.images && track.album.images[0] && (
                    <img src={track.album.images[0].url} alt={track.name} />
                )}
            </div>
            <div className="track-info">
                <h4>{track.name}</h4>
                <p className="artist">{track.artists.map(a => a.name).join(', ')}</p>
                <p className="duration">{formatDuration(track.duration_ms)}</p>
            </div>
            <div className="track-actions">
                <button
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={handleFavoriteClick}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
                <button
                    className="remove-track-btn"
                    onClick={handleRemoveClick}
                    title="Remove from playlist"
                >
                    ×
                </button>
            </div>

            <style jsx>{`
        .track-card {
            background-color: #181818;
            padding: 1rem;
            border-radius: 8px;
            transition: background-color 0.3s;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .track-card:hover {
            background-color: #282828;
        }
        .track-img-container img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
        }
        .track-info {
            flex: 1;
            overflow: hidden;
        }
        .track-info h4 {
            margin: 0 0 0.3rem 0;
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .artist {
            margin: 0;
            color: #b3b3b3;
            font-size: 0.9rem;
             white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .duration {
            margin: 0;
            color: #777;
            font-size: 0.8rem;
        }
        .track-actions {
            display: flex;
            gap: 0.5rem;
        }
        .favorite-btn, .remove-track-btn {
            background: transparent;
            border: none;
            color: #b3b3b3;
            cursor: pointer;
            font-size: 1.2rem;
            transition: color 0.2s;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
        }
        .favorite-btn:hover {
            color: #ffd700;
            background: rgba(255, 255, 255, 0.1);
        }
        .favorite-btn.active {
            color: #ffd700;
        }
        .remove-track-btn:hover {
            color: #ff5555;
            background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
        </div>
    );
}

function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
