import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../MyPlaylists/playlists.css";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import convertDuration from "../../../functions/ConvertDuration";
import "../../Favorites/Favorites";
import Songs from "../../MyPlaylists/EditPlaylist/Songs";
import {
  useGetAllSongsQuery,
  useGetPlaylistQuery,
} from "../../../redux/services/melodyApi";

function PublicPlaylist() {
  const [playlistInfo, setPlaylistInfo] = useState({});
  const [track, setTrack] = useState([
    {
      id: "",
      title: "",
      artist: "",
      duration: "",
      url: "",
    },
  ]);

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetAllSongsQuery();
  const {
    data: playlistAll,
    isFetching: playlistFetching,
    playlistError,
  } = useGetPlaylistQuery();

  const { id: playlistId } = useParams();

  useEffect(() => {
    const getPlaylistById = async () => {
      const response = await fetch(
        `https://melody-music-stream-production.up.railway.app/playlist/public/${playlistId}`
      );

      try {
        const data = await response.json();
        setPlaylistInfo(data.playlistInfo);
        setTrack(data.songs);
      } catch (error) {
        console.log(error);
      }
    };
    getPlaylistById();
  }, []);

  if (isFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );
  if (error) return <div>Error</div>;

  const playlistSongs = track.map((song, i) => (
    <Songs
      key={song._id}
      playlists={playlistAll}
      playlistId={playlistInfo.id}
      song={song}
      isPlaying={isPlaying}
      activeSong={activeSong}
      data={data}
      i={i}
      convertDuration={convertDuration}
    />
  ));


  return (
    <>
      <div className="flex flex-col ml-80 font-mons h-full">
        <div className="flex items-center h-64 mb-1">
          <img
            className="w-56 h-56 rounded-lg"
            src={playlistInfo.image}
            alt="thumbnail"
          />
          <section className="flex flex-col justify-center grow ml-5 text-white">
            <h2 className=" not-italic text-3xl font-black whitespace-nowrap text-ellipsis leading-80">
              {playlistInfo.name}
            </h2>
            <p>{playlistInfo.description}</p>
            <div className="playlist-description">
              <p>{!playlistInfo.isPublic ? "Private" : "Public"}</p>
              <p>{playlistInfo.tracks?.length} songs</p>
            </div>
          </section>
        </div>
        <Typography sx={{ color: "#f3f3f3", mt: 2, fontSize: 22 }}>
          Songs
        </Typography>
        <Box sx={{ mb: 5 }}>{playlistSongs}</Box>
      </div>
    </>
  );
}

export default PublicPlaylist;
