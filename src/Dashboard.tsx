import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import useAuth from "./useAuth";
import useRecommendations from "./useRecommendations";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Track } from "./useRecommendations";

interface DashboardProps {
  code: string | null;
}

export default function Dashboard({ code }: DashboardProps) {
  const accessToken = useAuth(code);
  console.log(accessToken);
  const trackRecommendations = useRecommendations(accessToken, "tracks");
  const artistRecommendations = useRecommendations(accessToken, "artists");
  /* const genreRecommendations = useRecommendations(accessToken, "genres"); */

  const listRef1 = useRef<HTMLDivElement>(null);
  const listRef2 = useRef<HTMLDivElement>(null);
  /* const listRef3 = useRef<HTMLDivElement>(null); */

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
          <h2 className="flex-1 text-xl font-bold">
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
            className="rounded-full font-semibold bg-green-600 py-2 px-4 transition ease-in-out duration-200 hover:scale-105"
            /* onClick={handleRefreshTrack} */
          >
            Refresh
          </button>
        </div>
        <SimpleBar autoHide={false}>
          <div className="" ref={listRef1}>
            <ul className="flex space-x-32">
              {trackRecommendations && trackRecommendations.length > 0 ? (
                trackRecommendations.map((track) => (
                  <li
                    className="relative flex flex-col items-center justify-center py-6 gap-y-4"
                    key={track.id}
                  >
                    <div className="relative aspect-square rounded-md w=64 h-64 overflow-hidden">
                      <img
                        src={track.album.images[0].url}
                        alt={`${track.name} album cover`}
                        className="object-cover"
                        title={track.name}
                      />
                    </div>
                    <div className="flex flex-col items-start w-full gap-y-1">
                      <span
                        className="w-full text-xl font-bold truncate"
                        title={track.name}
                      >
                        {track.name.length > 20
                          ? track.name.substring(0, 20) + "..."
                          : track.name}
                      </span>
                      <span className="text-neutral-400 text-sm w-full truncate">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li>No recommendations available</li>
              )}
            </ul>
          </div>
        </SimpleBar>
      </section>

      <section className="mb-10 mx-3">
        <div className="flex justify-between">
          <h2 className="flex-1 text-xl font-bold">
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
            className="rounded-full font-semibold bg-green-600 py-2 px-4 transition ease-in-out duration-200 hover:scale-105"
            /*  onClick={handleRefreshArtist} */
          >
            Refresh
          </button>
        </div>
        <SimpleBar autoHide={false}>
          <div className="" ref={listRef2}>
            <ul className="flex space-x-32">
              {artistRecommendations && artistRecommendations.length > 0 ? (
                artistRecommendations.map((track) => (
                  <li
                    className="relative flex flex-col items-center justify-center py-6 gap-y-4"
                    key={track.id}
                  >
                    <div className="relative aspect-square rounded-md w=64 h-64 overflow-hidden">
                      <img
                        src={track.album.images[0].url}
                        alt={`${track.name} album cover`}
                        className="w-full"
                        title={track.name}
                      />
                    </div>
                    <div className="flex flex-col items-start w-full gap-y-1">
                      <span
                        className="w-full text-xl font-bold truncate"
                        title={track.name}
                      >
                        {track.name.length > 20
                          ? track.name.substring(0, 20) + "..."
                          : track.name}
                      </span>
                      <span className="text-neutral-400 text-sm w-full truncate">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li>No recommendations available</li>
              )}
            </ul>
          </div>
        </SimpleBar>
      </section>

      {/* <section className="mx-3">
        <div className="flex justify-between">
          <h2 className="flex-1 text-xl font-bold">
            Based on your favorite genres
          </h2>
          <div className="flex justify-end space-x-1">
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
          </div>
        </div>
        <SimpleBar autoHide={false}>
          <div className="" ref={listRef3}>
            <ul className="flex space-x-32">
              {genreRecommendations && genreRecommendations.length > 0 ? (
                genreRecommendations.map((track) => (
                  <li className="w-full py-6" key={track.id}>
                    <div className="rounded overflow-hidden">
                      <img
                        src={track.album.images[0].url}
                        alt={`${track.name} album cover`}
                        className="w-full"
                        title={track.name}
                      />
                      <span
                        className="block text-xl font-bold"
                        title={track.name}
                      >
                        {track.name.length > 20
                          ? track.name.substring(0, 20) + "..."
                          : track.name}
                      </span>
                      <span className="block text-sm">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li>No recommendations available</li>
              )}
            </ul>
          </div>
        </SimpleBar>
      </section> */}
    </div>
  );
}
