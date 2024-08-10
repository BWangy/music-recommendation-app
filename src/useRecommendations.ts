import axios from "axios";
import { useEffect, useState } from "react";

interface Artist {
  id: string;
  name: string;
  genres: string[];
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
}

export default function useRecommendations(accessToken: string | undefined) {
  const [recommendations, setRecommendations] = useState<Track[] | undefined>();

  useEffect(() => {
    if (!accessToken) return;

    const fetchTopTracks = async () => {
      try {
        const topTracksRes = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const topTracks = topTracksRes.data.items;

        const trackIds = topTracks.map((track: Track) => track.id);
        const genres = Array.from(
          new Set(
            topTracks.flatMap((track: Track) =>
              track.artists.flatMap((artist: Artist) => artist.genres)
            )
          )
        ).slice(0, 5);

        const recommendationsRes = await axios.get(
          "https://api.spotify.com/v1/recommendations",
          {
            params: {
              seed_tracks: trackIds.slice(0, 5).join(","),
              seed_genres: genres.join(","),
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setRecommendations(recommendationsRes.data.tracks);
      } catch (error) {
        console.error("Error fetching tracks or recommendations:", error);
      }
    };

    fetchTopTracks();
  }, [accessToken]);

  return recommendations;
}
