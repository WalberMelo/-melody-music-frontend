import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../playlists.css";
import EditPlaylistModal from "./EditPlaylistModal";
import { Box } from "@mui/system";
import convertDuration from "../../../functions/ConvertDuration";
import SuggestSong from "./SuggestSong";
import {
  useGetAllSongsQuery,
  useGetPlaylistQuery,
} from "../../../redux/services/melodyApi";
import "../../Favorites/Favorites";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Songs from "./Songs";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function PlaylistViewSongs() {
  const token = localStorage.getItem("userToken") || null;
  const responsive = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  const [randomSongs, setRandomSongs] = useState([]);
  const [playlistInfo, setPlaylistInfo] = React.useState({});
  const [track, setTrack] = React.useState([
    {
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
        `https://melody-music-stream-production.up.railway.app/playlist/${playlistId}`,
        {
          headers: {
            auth_token: token,
          },
        }
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

  if (isFetching || playlistFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );
  if (error || playlistError) return <div>Error</div>;

  function randomIndex(count) {
    return Math.floor(Math.random() * count);
  }

  function getRandomSongs() {
    const randomSongs = [];
    const songs = data.songs;
    const count = songs.length;
    const randomIndexes = new Set();
    while (randomIndexes.size < 5) {
      randomIndexes.add(randomIndex(count));
    }
    for (let index of randomIndexes) {
      randomSongs.push(songs[index]);
    }
    setRandomSongs(randomSongs);
  }

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

  const suggestionSongs = randomSongs.map((song, i) => (
    <SuggestSong
      key={song._id}
      song={song}
      playlistId={playlistId}
      isPlaying={isPlaying}
      activeSong={activeSong}
      data={data}
      i={i}
      convertDuration={convertDuration}
    />
  ));



  return (
    <>
       {responsive ?
      <div className=" flex flex-col  font-mons h-full">
        <div className="flex flex-col items-center h-64 mb-1">
          <img
            className="w-56 h-56 rounded-lg"
            src={playlistInfo.image}
            alt="thumbnail"
          />
          <section className="flex flex-col justify-center grow text-white">
            <h2 className=" not-italic text-3xl  font-black whitespace-nowrap text-ellipsis leading-80">
              {playlistInfo.name}
            </h2>
            <p>{playlistInfo.description}</p>
            <div className="playlist-description">
              <p>{!playlistInfo.isPublic ? "Private" : "Public"}</p>
              <p>{playlistInfo.tracks?.length} songs</p>
            </div>
          </section>
        </div>
        <div style={{padding:'4rem 0 0.5rem', textAlign:'center'}}>
          <EditPlaylistModal {...playlistInfo} />
        </div>
        <Typography sx={{ color: "#f3f3f3", mt: 2, fontSize: 20, textAlign:'center' }}>
          Songs
        </Typography>
        <Box sx={{ mb: 5 }}>{playlistSongs}</Box>
        <Typography sx={{ color: "#f3f3f3", mt: 2, fontSize: 20,textAlign:'center' }}>
          Suggestions
        </Typography>
        <div>
          {playlistInfo.tracks?.length === 0 ? (
            <Typography sx={{ color: "#f3f3f3", mt: 2, fontSize: 22 }}>
              Your playlist is empty, we can suggest you some songs!
            </Typography>
          ) : null}
          {randomSongs.length > 0 ? <div>{suggestionSongs}</div> : null}
        </div>
        {randomSongs.length > 0 ? (
          <Button
            sx={{
              color: "white",
              borderColor: "white",
              m: 6,
              p: 1,
              pl: 1,
              pr: 1,
              width: "89%",
            }}
            variant="outlined"
            onClick={getRandomSongs}
          >
            REFRESH
          </Button>
        ) : (
          <Button
            sx={{
              color: "white",
              borderColor: "white",
              m: 6,
              p: 1,
              pl: 3,
              pr: 3,
              width: "89%",
            }}
            variant="outlined"
            onClick={getRandomSongs}
          >
            SUGGEST SONGS
          </Button>
        )}
      </div> :       <div className="flex flex-col ml-80 font-mons h-full">
        <div className="flex items-center h-64 mb-1">
          <img
            className="w-56 h-56 rounded-lg"
            src={playlistInfo.image}
            alt="thumbnail"
          />
          <section className="flex flex-col justify-center grow ml-5 text-white">
            <h2 className=" not-italic text-3xl  font-black whitespace-nowrap text-ellipsis leading-80">
              {playlistInfo.name}
            </h2>
            <p>{playlistInfo.description}</p>
            <div className="playlist-description">
              <p>{!playlistInfo.isPublic ? "Private" : "Public"}</p>
              <p>{playlistInfo.tracks?.length} songs</p>
            </div>
          </section>
        </div>
        <div>
          <EditPlaylistModal {...playlistInfo} />
        </div>
        <Typography sx={{ color: "#f3f3f3", mt: 2, fontSize: 22 }}>
          Songs
        </Typography>
        <Box sx={{ mb: 5 }}>{playlistSongs}</Box>
        <Typography sx={{ color: "#f3f3f3", mt: 2, fontSize: 22 }}>
          Suggestions
        </Typography>
        <div>
          {playlistInfo.tracks?.length === 0 ? (
            <Typography sx={{ color: "#f3f3f3", mt: 2, fontSize: 22 }}>
              Your playlist is empty, we can suggest you some songs!
            </Typography>
          ) : null}
          {randomSongs.length > 0 ? <div>{suggestionSongs}</div> : null}
        </div>
        {randomSongs.length > 0 ? (
          <Button
            sx={{
              color: "white",
              borderColor: "white",
              m: 2,
              p: 1,
              pl: 1,
              pr: 1,
              width: "89%",
            }}
            variant="outlined"
            onClick={getRandomSongs}
          >
            REFRESH
          </Button>
        ) : (
          <Button
            sx={{
              color: "white",
              borderColor: "white",
              m: 2,
              p: 1,
              pl: 3,
              pr: 3,
              width: "89%",
            }}
            variant="outlined"
            onClick={getRandomSongs}
          >
            SUGGEST SONGS
          </Button>
        )}
      </div> 
}
    </>
  );
}

export default PlaylistViewSongs;
