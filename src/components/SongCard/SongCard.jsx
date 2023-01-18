import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../../redux/features/playerSlice";
import LikedSongs from "../LikedSongs/LikedSongs";
import { Delete } from "@mui/icons-material";

const SongCard = ({
  song,
  isPlaying,
  activeSong,
  data,
  i,
  convertDuration,
}) => {
  const token = localStorage.getItem("userToken");
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handleDeleteSong = async (id) => {
    try {
      const response = await axios.delete(
        `https://melody-music-stream-production.up.railway.app/song/${id}`,
        {
          headers: {
            auth_token: token,
          },
        }
      );
      const result = await response.json;
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const location = useLocation();
  return (
    <tr key={song._id} className="favorites_list">
      <td>
        <PlayPause
          className="play"
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      </td>
      <td>
        <p>{song.title}</p>
      </td>
      <td>
        <p>{song.artist}</p>
      </td>
      <td>
        <p>{song.genre}</p>
      </td>
      <td className="duration-field">{convertDuration(song.duration)}</td>

      <td>
        <LikedSongs key={song._id} song={song} />
      </td>
      {
        <td>
          {location.pathname === "/songs" ? (
            <Delete
              className="btn_icon__delete"
              onClick={() => handleDeleteSong(song._id)}
            />
          ) : null}
        </td>
      }
    </tr>
  );
};

export default SongCard;
