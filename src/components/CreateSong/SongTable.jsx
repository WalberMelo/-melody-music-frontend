import "./createSong.css";
import "../Favorites/Favorites.css";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import {
  useGetUserSongsQuery,
  usePostAddSongsMutation,
} from "../../redux/services/melodyApi";
import convertDuration from "../../functions/ConvertDuration";
import convertDurationPlaylist from "../../functions/ConvertDurationPlaylist";
import SongCard from "../SongCard/SongCard";

//Material UI
import LinearProgress from "@mui/material/LinearProgress";
import { MusicNoteOutlined } from "@mui/icons-material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const Songs = () => {
  const [open, setOpen] = useState(false);
  const { data, isFetching, error } = useGetUserSongsQuery();
  const [updatePost] = usePostAddSongsMutation();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [song, setSong] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleErrorMessage = (message) => {
    setErrorMsg(message.split(":")[1].replace("url", "Song"));
  };

  const responsive = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#303030",
    border: "2px solid #000",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setErrorMsg("");
    setIsSuccess(false);
  };

  const handleSelectFile = async (fileUpload) => {
    const formData = new FormData();
    formData.append("song", fileUpload);
    return await uploadForm(formData);
  };

  const uploadForm = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        // "http://localhost:4000/cloud/uploadsong",
        "https://melody-music-stream-production.up.railway.app/cloud/uploadsong",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const progress = Math.floor((loaded * 100) / total);
            setProgress(progress);
          },
        }
      );
      let song = res.data;
      setSong(song);
      setIsSuccess(true);
      setIsLoading(false);
      setSuccess("File successfully upload");
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.response.data.msg);
      handleErrorMessage(error?.response.data.msg);
    }
  };

  // * Post with RTK
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updatePost({
        title: name,
        artist: artist,
        genre: genre,
        url: song.url,
        duration: song.duration,
      });
      handleClose();
    } catch (error) {
      setIsSuccess(false);
      console.log(error);

      setErrorMsg(error?.response.data.msg);
      handleErrorMessage(error?.response.data.msg);
    }
  };

  if (isFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );

  if (error) return <div>Error</div>;

  const totalDuration = data.songs.map((song) => song.duration);

  return (
    <>
      {responsive ? (
        <div className="container-responsive">
          <header className="head">
            <section className="info">
              <h2 style={{ color: "white" }}>
                Your upload songs
                <LibraryMusicIcon />
              </h2>
              <div className="details">
                <p>{data.songs.length} Songs</p>
                <p id="dot">&bull;</p>
                <p>{convertDurationPlaylist(totalDuration)}</p>
              </div>
            </section>
            <Button
              onClick={handleOpen}
              startIcon={<AddCircleOutlineIcon style={{ color: "white" }} />}
              label="Add New Song"
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 400 }}>
                <Paper>
                  <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                    <div className="inputText">
                      <TextField
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        label="Enter song name"
                        required={true}
                      />
                    </div>
                    <div className="inputArtist">
                      <TextField
                        name="artist"
                        label="Artist name"
                        required={true}
                        onChange={(e) => setArtist(e.target.value)}
                      />
                    </div>
                    <div className="inputGenre">
                      <Box>
                        <FormControl sx={{ minWidth: 120 }}>
                          <InputLabel id="demo-simple-select-label">
                            Genre
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            autoWidth
                            onChange={(e) => setGenre(e.target.value)}
                          >
                            <MenuItem value={"Pop"}>Pop</MenuItem>
                            <MenuItem value={"Rock"}>Rock</MenuItem>
                            <MenuItem value={"Rap "}>Rap</MenuItem>
                            <MenuItem value={"Techno"}>Techno</MenuItem>
                            <MenuItem value={"Classic"}> Classic</MenuItem>
                            <MenuItem value={"Latina"}> Latina</MenuItem>
                            <MenuItem value={"Alternative"}>
                              Alternative
                            </MenuItem>
                            <MenuItem value={"Acoustic"}>Acoustic</MenuItem>
                            <MenuItem value={"Reggaeton"}>Reggaeton</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div>
                      <div className="inputDiv">
                        <Button
                          variant="contained"
                          component="label"
                          className="buttonFile"
                        >
                          {<MusicNoteOutlined />}
                          <input
                            className="inputs"
                            label="Choose song"
                            type="file"
                            accept="audio/*"
                            name="song"
                            onChange={(e) =>
                              handleSelectFile(e.target.files[0])
                            }
                            hidden
                          />
                          Add song
                        </Button>
                        {isLoading && (
                          <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{ mr: "3.5rem", ml: "3.5rem" }}
                          />
                        )}
                      </div>
                    </div>

                    {isSuccess && (
                      <h3 style={{ textAlign: "center", color: "#25dc8b" }}>
                        {success}
                      </h3>
                    )}

                    <h3 style={{ textAlign: "center", color: "red" }}>
                      {errorMsg}
                    </h3>

                    <div className="inputSubmit">
                      <Button variant="outlined" type="submit">
                        Submit
                      </Button>
                    </div>
                  </form>
                </Paper>
              </Box>
            </Modal>
          </header>
          <table className="upload-table ">
            <tbody className="uploads-responsive">
              {data.songs.map((song, i) => (
                <SongCard
                  key={song._id}
                  song={song}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={data}
                  i={i}
                  convertDuration={convertDuration}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="container">
          <header className="head">
            <section className="info">
              <h1 style={{ color: "white" }}>
                Your upload songs
                <LibraryMusicIcon />
              </h1>
              <div className="details">
                <p>{data.songs.length} Songs</p>
                <p id="dot">&bull;</p>
                <p>{convertDurationPlaylist(totalDuration)}</p>
              </div>
            </section>
            <Button
              onClick={handleOpen}
              startIcon={<AddCircleOutlineIcon style={{ color: "white" }} />}
              label="Add New Song"
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 400 }}>
                <Paper>
                  <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                    <div className="inputText">
                      <TextField
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        label="Enter song name"
                        required={true}
                      />
                    </div>
                    <div className="inputArtist">
                      <TextField
                        name="artist"
                        label="Artist name"
                        required={true}
                        onChange={(e) => setArtist(e.target.value)}
                      />
                    </div>
                    <div className="inputGenre">
                      <Box>
                        <FormControl sx={{ minWidth: 120 }}>
                          <InputLabel id="demo-simple-select-label">
                            Genre
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            autoWidth
                            onChange={(e) => setGenre(e.target.value)}
                          >
                            <MenuItem value={"Pop"}>Pop</MenuItem>
                            <MenuItem value={"Rock"}>Rock</MenuItem>
                            <MenuItem value={"Rap "}>Rap</MenuItem>
                            <MenuItem value={"Techno"}>Techno</MenuItem>
                            <MenuItem value={"Classic"}> Classic</MenuItem>
                            <MenuItem value={"Latina"}> Latina</MenuItem>
                            <MenuItem value={"Alternative"}>
                              Alternative
                            </MenuItem>
                            <MenuItem value={"Acoustic"}>Acoustic</MenuItem>
                            <MenuItem value={"Reggaeton"}>Reggaeton</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>

                    <Box>
                      <div className="inputDiv">
                        <Button
                          variant="contained"
                          component="label"
                          className="buttonFile"
                        >
                          {<MusicNoteOutlined />}
                          <input
                            className="inputs"
                            label="Choose song"
                            type="file"
                            accept="audio/*"
                            name="song"
                            onChange={(e) =>
                              handleSelectFile(e.target.files[0])
                            }
                            hidden
                          />
                          Add song
                        </Button>
                      </div>
                      {isLoading && (
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{ mr: "3.5rem", ml: "3.5rem" }}
                        />
                      )}
                    </Box>

                    {isSuccess && (
                      <h3 style={{ textAlign: "center", color: "#25dc8b" }}>
                        {success}
                      </h3>
                    )}

                    <h3 style={{ textAlign: "center", color: "red" }}>
                      {errorMsg}
                    </h3>

                    <div className="inputSubmit">
                      <Button variant="outlined" type="submit">
                        Submit
                      </Button>
                    </div>
                  </form>
                </Paper>
              </Box>
            </Modal>
          </header>
          <Typography sx={{ color: "white", fontSize: "1.5em", ml: "1.5em" }}>
            {data.songs.length === 0 && "You don't have any song uploaded!"}
          </Typography>
          <table className="favorites-table ">
            <tbody className="favorites_line__bottom">
              {data.songs.map((song, i) => (
                <SongCard
                  key={song._id}
                  song={song}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={data}
                  i={i}
                  convertDuration={convertDuration}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Songs;
