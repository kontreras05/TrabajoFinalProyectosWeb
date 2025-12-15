
import { getArtistTopTracks, searchTracksByGenre } from './spotify';

export const generatePlaylist = async (preferences, token) => {
    let tracks = [];
    const seenTrackIds = new Set();

    // 1. Tracks from selected artists
    if (preferences.artists && preferences.artists.length > 0) {
        for (const artist of preferences.artists) {
            try {
                const data = await getArtistTopTracks(artist.id, token);
                if (data.tracks) {
                    // Take top 3 tracks from each artist
                    data.tracks.slice(0, 3).forEach(track => {
                        if (!seenTrackIds.has(track.id)) {
                            tracks.push(track);
                            seenTrackIds.add(track.id);
                        }
                    });
                }
            } catch (err) {
                console.error(`Error fetching top tracks for artist ${artist.name}`, err);
            }
        }
    }

    // 2. Tracks from selected genres
    if (preferences.genres && preferences.genres.length > 0) {
        for (const genre of preferences.genres) {
            try {
                const data = await searchTracksByGenre(genre, token);
                if (data.tracks && data.tracks.items) {
                    data.tracks.items.forEach(track => {
                        if (!seenTrackIds.has(track.id)) {
                            tracks.push(track);
                            seenTrackIds.add(track.id);
                        }
                    });
                }
            } catch (err) {
                console.error(`Error fetching tracks for genre ${genre}`, err);
            }
        }
    }

    // 3. Tracks explicitly selected (if any)
    if (preferences.tracks && preferences.tracks.length > 0) {
        preferences.tracks.forEach(track => {
            if (!seenTrackIds.has(track.id)) {
                tracks.push(track);
                seenTrackIds.add(track.id);
            }
        });
    }

    // Shuffle the tracks
    tracks = tracks.sort(() => Math.random() - 0.5);

    return tracks;
};
