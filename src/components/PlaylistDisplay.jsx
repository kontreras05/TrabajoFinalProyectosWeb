
import TrackCard from './TrackCard';

export default function PlaylistDisplay({ tracks, onRemoveTrack, favorites, onToggleFavorite, onGenerate, isGenerating, onSave, isSaving }) {
    if (!tracks || tracks.length === 0) {
        return (
            <div className="playlist-empty">
                <p>Your playlist is empty. Make some selections and generate a mix!</p>
                <button
                    className="generate-btn"
                    onClick={onGenerate}
                    disabled={isGenerating}
                >
                    {isGenerating ? 'Generating...' : 'Generate Playlist'}
                </button>
                <style jsx>{`
                .playlist-empty {
                    text-align: center;
                    padding: 3rem;
                    background: #181818;
                    border-radius: 8px;
                    color: #b3b3b3;
                }
                .generate-btn {
                    margin-top: 1rem;
                    background-color: #1DB954;
                    color: black;
                    border: none;
                    padding: 0.8rem 2rem;
                    border-radius: 30px;
                    font-weight: bold;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: transform 0.2s, background-color 0.2s;
                }
                .generate-btn:hover:not(:disabled) {
                    transform: scale(1.05);
                    background-color: #1ed760;
                }
                .generate-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
            `}</style>
            </div>
        );
    }

    return (
        <div className="playlist-display">
            <div className="playlist-header">
                <h3>Your Custom Mix</h3>
                <div className="header-actions">
                    <button
                        className="save-btn"
                        onClick={onSave}
                        disabled={isSaving}
                        title="Save to Spotify"
                    >
                        {isSaving ? 'Saving...' : '💾 Save to Spotify'}
                    </button>
                    <button
                        className="refresh-btn"
                        onClick={onGenerate}
                        disabled={isGenerating}
                        title="Refresh Playlist"
                    >
                        {isGenerating ? '...' : '↻ Refresh'}
                    </button>
                </div>
            </div>

            <div className="tracks-grid">
                {tracks.map(track => {
                    const isFavorite = favorites.some(f => f.id === track.id);
                    return (
                        <TrackCard
                            key={track.id}
                            track={track}
                            onRemove={onRemoveTrack}
                            isFavorite={isFavorite}
                            onToggleFavorite={onToggleFavorite}
                        />
                    );
                })}
            </div>

            <style jsx>{`
            .playlist-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            .header-actions {
                display: flex;
                gap: 1rem;
            }
            .save-btn {
                background: #1DB954;
                border: none;
                color: black;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                cursor: pointer;
                transition: transform 0.2s, background-color 0.2s;
                font-weight: bold;
            }
            .save-btn:hover:not(:disabled) {
                background-color: #1ed760;
                transform: scale(1.05);
            }
            .save-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
            .refresh-btn {
                background: transparent;
                border: 1px solid #777;
                color: #fff;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.2s;
            }
            .refresh-btn:hover:not(:disabled) {
                border-color: #fff;
                background: rgba(255,255,255,0.1);
            }
        `}</style>
        </div>
    );
}
