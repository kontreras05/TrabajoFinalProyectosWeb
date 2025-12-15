
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

    // Filter by Popularity
    if (preferences.popularity !== undefined) {
        // Define a range. E.g. +/- 20 from the selected popularity
        // Or if it's "Mainstream" (high), select high.
        // User widget allows 0-100.
        // Let's allow a flexible range.
        const targetPop = preferences.popularity;
        tracks = tracks.filter(track => {
            // Keep tracks within a reasonable range, but don't be too strict or we lose everything
            // If target is 100 (mainstream), we want high popularity (e.g. > 60)
            // If target is 0 (obscure), we want low popularity (e.g. < 40)

            // Heuristic:
            // High popularity requested (>70): Keep tracks > 50
            // Low popularity requested (<30): Keep tracks < 60
            // Mid: Keep everything or range +/- 30

            if (targetPop >= 70) return track.popularity >= 40;
            if (targetPop <= 30) return track.popularity <= 60;
            return true; // Mid-range usually accepts varied tracks
        });
    }

    // Filter by Decade
    if (preferences.decades && preferences.decades.length > 0) {
        tracks = tracks.filter(track => {
            if (!track.album.release_date) return false;
            const year = parseInt(track.album.release_date.substring(0, 4));
            return preferences.decades.some(decade => {
                const [start, end] = decade.id.split('-').map(Number);
                return year >= start && year <= end;
            });
        });
    }

    // Shuffle the tracks
    tracks = tracks.sort(() => Math.random() - 0.5);

    return tracks;
};
