
import TrackCard from './TrackCard';

export default function PlaylistDisplay({ tracks, onRemoveTrack, favorites, onToggleFavorite, onGenerate, isGenerating, onSave, isSaving }) {
    if (!tracks || tracks.length === 0) {
        return (
            <div className="text-center p-16 bg-[#181818]/60 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-6xl mb-6 animate-bounce">💿</div>
                <h3 className="text-2xl font-bold text-white mb-2">¿Listo para Mezclar?</h3>
                <p className="text-gray-400 mb-8 max-w-md">Selecciona tus artistas, géneros y vibras favoritas arriba, luego presiona el botón de abajo para generar tu playlist perfecta.</p>
                <button
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white border-none py-4 px-10 rounded-full font-bold text-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                    onClick={onGenerate}
                    disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <span className="animate-spin">↻</span> Generando...
                        </>
                    ) : (
                        <>
                            <span>✨</span> Generar Playlist
                        </>
                    )}
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#181818]/40 backdrop-blur-sm p-8 rounded-3xl border border-white/5 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h3 className="text-3xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Tu Mezcla Personalizada</h3>
                    <p className="text-gray-400 text-sm mt-1">{tracks.length} canciones curadas solo para ti</p>
                </div>
                <div className="flex gap-4">
                    <button
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white border-none py-2.5 px-6 rounded-full cursor-pointer font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        onClick={onSave}
                        disabled={isSaving}
                        title="Guardar en Spotify"
                    >
                        {isSaving ? <span className="animate-spin">↻</span> : '💾'} {isSaving ? 'Guardando...' : 'Guardar en Spotify'}
                    </button>
                    <button
                        className="bg-white/5 border border-white/10 text-white py-2.5 px-6 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        onClick={onGenerate}
                        disabled={isGenerating}
                        title="Actualizar Playlist"
                    >
                        {isGenerating ? <span className="animate-spin">↻</span> : '↻'} {isGenerating ? '...' : 'Actualizar'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
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
