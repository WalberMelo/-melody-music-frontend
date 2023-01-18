import "./Top.css";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import SongCart from "./SongCart";
import { useGetLikedSongsQuery } from "../../redux/services/melodyApi";
import convertDuration from "../../functions/ConvertDuration";

function Top() {
  const { data, error } = useGetLikedSongsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (error)
    return (
      <Link
        to="/"
        className="text-black bg-white font-medium rounded-lg text-sm ml-2.5 mt-4
  px-5 py-2.5 text-center inline-flex items-center btn-home--seeAll"
      >
        Login
        <svg
          aria-hidden="true"
          className="ml-2 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
    );

  return (
    <div className="top-songs-container">
      <h1 className="mb-3 ml-4 not-italic font-bold font-mons text-xl text-white">
        Liked Songs
      </h1>
      <section>
        {data?.songs.length > 0 ? (
          data.songs.slice(0, 8).map((song, i) => {
            return (
              <SongCart
                key={song._id}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
                i={i}
                convertDuration={convertDuration}
              />
            );
          })
        ) : (
          <Typography sx={{ color: "white" }}>
            You don't have liked songs
          </Typography>
        )}
      </section>
      <Link
        to="/favorites"
        className="text-black bg-white font-medium rounded-lg text-sm ml-2.5 mt-4
        px-5 py-2.5 text-center inline-flex items-center btn-home--seeAll"
      >
        See all
        <svg
          aria-hidden="true"
          className="ml-2 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
    </div>
  );
}

export default Top;
