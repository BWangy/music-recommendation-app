import { useRef, useState } from "react";
import useAuth from "./useAuth";
import useRecommendations from "./useRecommendations";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

interface DashboardProps {
  code: string | null;
}

export default function Dashboard({ code }: DashboardProps) {
  const accessToken = useAuth(code);
  console.log(accessToken);

  const [refreshTracks, setRefreshTracks] = useState(false);
  const [refreshArtists, setRefreshArtists] = useState(false);
  const [refreshGenres, setRefreshGenres] = useState(false);

  const trackRecommendations = useRecommendations(
    accessToken,
    "tracks",
    refreshTracks
  );
  const artistRecommendations = useRecommendations(
    accessToken,
    "artists",
    refreshArtists
  );
  const genreRecommendations = useRecommendations(
    accessToken,
    "genres",
    refreshGenres
  );

  const listRef1 = useRef<HTMLDivElement>(null);
  const listRef2 = useRef<HTMLDivElement>(null);
  const listRef3 = useRef<HTMLDivElement>(null);

  const handleRefresh = (type: string) => {
    if (type === "tracks") {
      setRefreshTracks((prev) => !prev);
    } else if (type === "artists") {
      setRefreshArtists((prev) => !prev);
    } else if (type === "genres") {
      setRefreshGenres((prev) => !prev);
    }
  };

  /* const scrollLeft = (listRef: RefObject<HTMLDivElement>) => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: -1000,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (listRef: RefObject<HTMLDivElement>) => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 1000,
        behavior: "smooth",
      });
    }
  }; */

  return (
    <div>
      <div className="flex py-6 px-3">
        <a
          href="/"
          className="text-green-300 text-xl font-semibold hover:opacity-80"
        >
          NewMusic
        </a>
      </div>
      <section className="mb-10 mx-3">
        <div className="flex justify-between">
          <h2 className="flex-1 text-lg font-bold md:text-xl">
            Based on your favorite tracks
          </h2>
          {/* <div className="flex justify-end space-x-1">
            <button
              className="transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
              onClick={() => scrollLeft(listRef1)}
            >
              {"<"}
            </button>
            <button
              className="transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
              onClick={() => scrollRight(listRef1)}
            >
              {">"}
            </button>
          </div> */}
          <button
            className="text-sm rounded-full font-semibold bg-green-600 py-2 px-3 transition ease-in-out duration-200 hover:scale-105 md:text-base md:px-4"
            onClick={() => handleRefresh("tracks")}
          >
            Refresh
          </button>
        </div>
        <SimpleBar autoHide={false}>
          <div className="" ref={listRef1}>
            <ul className="flex space-x-4 md:space-x-24">
              {trackRecommendations && trackRecommendations.length > 0 ? (
                trackRecommendations.map((track) => (
                  <li
                    className="relative flex flex-col items-start justify-center py-6 gap-y-2 md:gap-y-4"
                    key={track.id}
                  >
                    <a
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity duration-200"
                    >
                      <div className="relative aspect-square rounded-md w-32 h-32 overflow-hidden md:w-52 md:h-52">
                        <img
                          src={track.album.images[0].url}
                          alt={`${track.name} album cover`}
                          className="object-cover"
                          title={track.name}
                        />
                      </div>
                    </a>
                    <div className="flex flex-col items-start w-full gap-y-0.5 md:gap-y-1">
                      <span
                        className="w-32 text-base font-bold truncate md:w-52 md:text-xl"
                        title={track.name}
                      >
                        {track.name.length > 20
                          ? track.name.substring(0, 20) + "..."
                          : track.name}
                      </span>
                      <span className="text-neutral-400 text-sm w-32 truncate md:w-52">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li>Loading...</li>
              )}
            </ul>
          </div>
        </SimpleBar>
      </section>

      <section className="mb-10 mx-3">
        <div className="flex justify-between">
          <h2 className="flex-1 text-lg font-bold md:text-xl">
            Based on your favorite artists
          </h2>
          {/* <div className="flex justify-end space-x-1">
            <button
              className="transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
              onClick={() => scrollLeft(listRef2)}
            >
              {"<"}
            </button>
            <button
              className="transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
              onClick={() => scrollRight(listRef2)}
            >
              {">"}
            </button>
          </div> */}
          <button
            className="text-sm rounded-full font-semibold bg-green-600 py-2 px-3 transition ease-in-out duration-200 hover:scale-105 md:text-base md:px-4"
            onClick={() => handleRefresh("artists")}
          >
            Refresh
          </button>
        </div>
        <SimpleBar autoHide={false}>
          <div className="" ref={listRef2}>
            <ul className="flex space-x-4 md:space-x-24">
              {artistRecommendations && artistRecommendations.length > 0 ? (
                artistRecommendations.map((track) => (
                  <li
                    className="relative flex flex-col items-start justify-center py-6 gap-y-2 md:gap-y-4"
                    key={track.id}
                  >
                    <a
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity duration-200"
                    >
                      <div className="relative aspect-square rounded-md w-32 h-32 overflow-hidden md:w-52 md:h-52">
                        <img
                          src={track.album.images[0].url}
                          alt={`${track.name} album cover`}
                          className="w-full"
                          title={track.name}
                        />
                      </div>
                    </a>

                    <div className="flex flex-col items-start w-full gap-y-0.5 md:gap-y-1">
                      <span
                        className="w-32 text-base font-bold truncate md:w-52 md:text-xl"
                        title={track.name}
                      >
                        {track.name.length > 20
                          ? track.name.substring(0, 20) + "..."
                          : track.name}
                      </span>
                      <span className="text-neutral-400 text-sm w-32 truncate md:w-52">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li>Loading...</li>
              )}
            </ul>
          </div>
        </SimpleBar>
      </section>

      {/* Add section for random genre recommendations */}

      <section className="mx-3">
        <div className="flex justify-between">
          <h2 className="flex-1 text-lg font-bold md:text-xl">Spice it up</h2>
          {/* <div className="flex justify-end space-x-1">
            <button
              className="transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
              onClick={() => scrollLeft(listRef3)}
            >
              {"<"}
            </button>
            <button
              className="transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
              onClick={() => scrollRight(listRef3)}
            >
              {">"}
            </button>
          </div> */}
          <button
            className="text-sm rounded-full font-semibold bg-green-600 py-2 px-3 transition ease-in-out duration-200 hover:scale-105 md:text-base md:px-4"
            onClick={() => handleRefresh("genres")}
          >
            Refresh
          </button>
        </div>
        <SimpleBar autoHide={false}>
          <div className="" ref={listRef3}>
            <ul className="flex space-x-4 md:space-x-24">
              {genreRecommendations && genreRecommendations.length > 0 ? (
                genreRecommendations.map((track) => (
                  <li
                    className="relative flex flex-col items-start justify-center py-6 gap-y-2 md:gap-y-4"
                    key={track.id}
                  >
                    <a
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity duration-200"
                    >
                      <div className="relative aspect-square rounded-md w-32 h-32 overflow-hidden md:w-52 md:h-52">
                        <img
                          src={track.album.images[0].url}
                          alt={`${track.name} album cover`}
                          className="w-full"
                          title={track.name}
                        />
                      </div>
                    </a>

                    <div className="flex flex-col items-start w-full gap-y-0.5 md:gap-y-1">
                      <span
                        className="w-32 text-base font-bold truncate md:w-52 md:text-xl"
                        title={track.name}
                      >
                        {track.name.length > 20
                          ? track.name.substring(0, 20) + "..."
                          : track.name}
                      </span>
                      <span className="text-neutral-400 text-sm w-32 truncate md:w-52">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li>Loading...</li>
              )}
            </ul>
          </div>
        </SimpleBar>
      </section>
    </div>
  );
}
