
import TrackCard from './TrackCard';

export default function PlaylistDisplay({ tracks }) {
    if (!tracks || tracks.length === 0) {
        return <div className="playlist-empty">No tracks to display</div>;
    }

    return (
        <div className="playlist-display">
            <h3>Your Playlist</h3>
            <div className="tracks-grid">
                {tracks.map(track => (
                    <TrackCard key={track.id} track={track} />
                ))}
            </div>
        </div>
    );
}
