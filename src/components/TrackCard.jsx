
export default function TrackCard({ track }) {
    if (!track) return null;
    return (
        <div className="track-card">
            <div className="track-info">
                <h4>{track.name}</h4>
                <p>{track.artists.map(a => a.name).join(', ')}</p>
            </div>
        </div>
    );
}
