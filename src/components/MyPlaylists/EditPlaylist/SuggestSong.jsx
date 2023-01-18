import * as React from "react";
import { useDispatch } from "react-redux";
import PlayPause from "../../SongCard/PlayPause";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { playPause, setActiveSong } from "../../../redux/features/playerSlice";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import LikedSongs from "../../LikedSongs/LikedSongs";

function SuggestSong({
  song,
  isPlaying,
  activeSong,
  data,
  i,
  convertDuration,
  playlistId,
}) {
  const token = localStorage.getItem("userToken") || null;
  const [successMsg, setSuccessMsg] = React.useState("");
  const [isSongAdd, setIsSongAdd] = React.useState(false);

  const [ErrorMsg, setErrorMsg] = React.useState("");
  const [serverError, setSeverError] = React.useState(false);

  const [open, setOpen] = React.useState(true);
  const [openError, setOpenError] = React.useState(true);

  const dispatch = useDispatch();

  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const addSuggestSong = async (e, songId) => {
    e.preventDefault();
    const playId = playlistId;
    const songsId = songId;

    const options = {
      url: `https://melody-music-stream-production.up.railway.app/playlist/add-song/${playId}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        auth_token: token,
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        song_id: songsId,
      },
    };

    try {
      const result = await axios(options);
      setSuccessMsg(result.data.msg);
      setIsSongAdd(true);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
        setErrorMsg(error.response.data.msg);
        setSeverError(true);
      }
    }
  };

  return (
    <>
      <div className="container-song suggestions">
        <div className="cover-container">
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            className="playpause"
          />
        </div>
        <div className="info-container">
          <span>{song.title}</span>
          <div className="contributors">
            <p className="track-artist">{song.artist}</p>
          </div>
        </div>

        {isSongAdd && (
          <Box sx={{ width: "100%" }}>
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {successMsg}
              </Alert>
            </Collapse>
          </Box>
        )}

        {serverError && (
          <Box sx={{ width: "100%" }}>
            <Collapse in={openError}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity="warning"
                sx={{ mb: 2 }}
              >
                {ErrorMsg}
              </Alert>
            </Collapse>
          </Box>
        )}

        <LikedSongs key={song._id} song={song} />

        <Box sx={{ display: "flex" }}>
          <div>
            <Typography sx={{ p: 1 }}>
              {convertDuration(song.duration)}
            </Typography>
          </div>
          <Box sx={{ display: "flex" }}>
            <button
              onClick={(e) => {
                handleClose();
                addSuggestSong(e, song._id);
              }}
            >
              <PlaylistAddIcon
                onClick={() => setOpenError(true)}
                sx={{ ml: "1em", mr: "0.5em" }}
              />
            </button>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default SuggestSong;
