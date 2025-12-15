
import TrackCard from './TrackCard';

export default function PlaylistDisplay({ tracks, onRemoveTrack, favorites, onToggleFavorite, onGenerate, isGenerating, onSave, isSaving }) {
    if (!tracks || tracks.length === 0) {
        return (
            <div className="text-center p-12 bg-[#181818] rounded-lg text-[#b3b3b3]">
                <p>Your playlist is empty. Make some selections and generate a mix!</p>
                <button
                    className="mt-4 bg-[#1DB954] text-black border-none py-3 px-8 rounded-[30px] font-bold text-lg cursor-pointer transition-transform duration-200 hover:scale-105 hover:bg-[#1ed760] disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={onGenerate}
                    disabled={isGenerating}
                >
                    {isGenerating ? 'Generating...' : 'Generate Playlist'}
                </button>
            </div>
        );
    }

    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Your Custom Mix</h3>
                <div className="flex gap-4">
                    <button
                        className="bg-[#1DB954] text-black border-none py-2 px-4 rounded-[20px] cursor-pointer font-bold transition-transform duration-200 hover:scale-105 hover:bg-[#1ed760] disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={onSave}
                        disabled={isSaving}
                        title="Save to Spotify"
                    >
                        {isSaving ? 'Saving...' : '💾 Save to Spotify'}
                    </button>
                    <button
                        className="bg-transparent border border-[#777] text-white py-2 px-4 rounded-[20px] cursor-pointer transition-all duration-200 hover:border-white hover:bg-white/10 disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={onGenerate}
                        disabled={isGenerating}
                        title="Refresh Playlist"
                    >
                        {isGenerating ? '...' : '↻ Refresh'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
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
        </div>
    );
}
