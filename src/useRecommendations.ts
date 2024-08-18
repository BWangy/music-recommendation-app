import axios from "axios";
import { useDebugValue, useEffect, useState } from "react";

type Artist = {
  id: string;
  name: string;
  genres: string[];
};

export type Track = {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
};

type Album = {
  images: Image[];
};

type Image = {
  url: string;
  height: number;
  width: number;
};

export default function useRecommendations(
  accessToken: string | undefined,
  type = "tracks",
  refresh = false
) {
  const [recommendations, setRecommendations] = useState<Track[] | undefined>();

  useEffect(() => {
    if (!accessToken) return;

    const fetchRecommendations = async () => {
      try {
        let params = {};

        if (type === "tracks") {
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
          params = { seed_tracks: trackIds.slice(0, 5).join(",") };
          /* genres = Array.from(
            new Set(
              topTracks.flatMap((track: Track) =>
                track.artists.flatMap((artist: Artist) => artist.genres)
              )
            )
          ).slice(0, 5); */
        } else if (type === "artists") {
          const topArtistsRes = await axios.get(
            "https://api.spotify.com/v1/me/top/artists?time_range=short_term",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const topArtists = topArtistsRes.data.items;

          const artistIds = topArtists.map((artist: Artist) => artist.id);
          params = { seed_artists: artistIds.slice(0, 5).join(",") };

          /* genres = Array.from(
            new Set(topArtists.flatMap((artist: Artist) => artist.genres))
          ).slice(0, 5); */
        } else if (type === "genres") {
          const genreSeedsRes = await axios.get(
            "https://api.spotify.com/v1/recommendations/available-genre-seeds",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const validGenres = genreSeedsRes.data.genres;
          const randomGenres = new Set();

          while (randomGenres.size < 5) {
            const randomIndex = Math.floor(Math.random() * validGenres.length);
            randomGenres.add(validGenres[randomIndex]);
          }

          const selectedGenres = Array.from(randomGenres);
          console.log(selectedGenres);

          params = { seed_genres: selectedGenres.join(",") };

          /* const topTracksRes = await axios.get(
            "https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const topTracks = topTracksRes.data.items;

          const artistIds = topTracks
            .flatMap((track: Track) =>
              track.artists.map((artist: Artist) => artist.id)
            )
            .slice(0, 5);

          if (artistIds.length > 0) {
            const artistsRes = await axios.get(
              `https://api.spotify.com/v1/artists?ids=${artistIds.join(",")}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            const genres = Array.from(
              new Set(
                artistsRes.data.artists.flatMap(
                  (artist: Artist) => artist.genres
                )
              )
            );

            const filteredGenres = genres
              .filter((genre) => validGenres.includes(genre))
              .slice(0, 5);

            console.log(filteredGenres);

            params = { seed_genres: filteredGenres.join(",") };
          } */
        }

        const recommendationsRes = await axios.get(
          "https://api.spotify.com/v1/recommendations",
          {
            params,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setRecommendations(recommendationsRes.data.tracks);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [accessToken, type, refresh]);

  return recommendations;
}
