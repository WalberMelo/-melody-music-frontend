import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import NativeSelect from "@mui/material/NativeSelect";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import "../playlists.css";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditPlaylistModal(id) {
  const [playlist, setPlaylistInfo] = useState({
    name: "",
    description: "",
    publicAccessible: "",
    thumbnail: "",
  });
  const responsive = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  console.log(playlist);

  const token = localStorage.getItem("userToken") || null;
  const [open, setOpen] = useState(false);

  //API states
  const [hasAlbumCoverImg, setHasAlbumCoverImg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaylistInfo((prevText) => {
      return {
        ...prevText,
        [name]: value,
      };
    });
  };

  const handleSelectedFile = (fileSelect) => {
    submitSelectFileToCloudinary(fileSelect);
  };

  const submitSelectFileToCloudinary = async (fileUpload) => {
    const formData = new FormData();
    formData.append("thumbnail", fileUpload);

    const options = {
      url: `https://melody-music-stream-production.up.railway.app/cloud/uploadthumbnail`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    try {
      const result = await axios(options);
      console.log(result);
      setPlaylistInfo((prevText) => {
        return {
          ...prevText,
          thumbnail: result.data.image,
        };
      });
      setHasAlbumCoverImg(true);
    } catch (error) {
      if (error.response) {
        console.log(error);
        setErrorMsg(error.response.data.msg);
      }
    }
  };

  const editPlaylist = async () => {
    const playlistId = id.id;
    const options = {
      url: `https://melody-music-stream-production.up.railway.app/playlist/edit/${playlistId}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        auth_token: token,
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: playlist,
    };

    try {
      const result = await axios(options);
      console.log(result);
      window.location.reload(true);
    } catch (error) {
      if (error.response) {
        setHasError(true);
        setErrorMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      {responsive ? <>
      <Button
        variant="outlined"
        startIcon={<ModeEditOutlineIcon />}
        className="btn-newPlaylist"
        sx={{
          color: "white",
          borderColor: "white",
          m: 2,
          p: 1,
          pl: 3,
          pr: 3,
        }}
        onClick={handleOpen}
      >
        Edit Playlist
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" noValidate autoComplete="off" sx={style}>
          <Box sx={{ display: "flex",flexDirection:'column', justifyContent: "space-between" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ width: "100%" ,display: "flex", }}
            >
              Edit Playlist
            </Typography>
            {hasAlbumCoverImg ? (
              <img
                src={playlist.thumbnail}
                className="editModal-albumCover--img"
                alt="album cover"
              />
            ): (
              <Button variant="contained" component="label">
                <PhotoAlbumIcon sx={{ fontSize: 40 }} />
                Album cover
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleSelectedFile(e.target.files[0])}
                />
              </Button>
            )}
          </Box>
          <FormControl
            variant="standard"
            sx={{ backgroundColor: "white", width: "100%" }}
          >
            <Input
              id="title"
              aria-describedby="my-helper-text"
              placeholder="Title"
              value={playlist.name}
              name="name"
              onChange={handleChange}
              sx={{ mt: 4, mb: 4 }}
            />
            <Input
              id="description"
              aria-describedby="my-helper-text"
              placeholder="Description"
              value={playlist.description}
              name="description"
              onChange={handleChange}
              sx={{ mb: 4 }}
            />
          </FormControl>

          {/* Privacy */}
          <Box sx={{ maxWidth: 100 }}>
            <FormControl fullWidth>
              <NativeSelect
                onChange={handleChange}
                value={playlist.publicAccessible}
                name="publicAccessible"
              >
                <option value={false}>Private</option>
                <option value={true}>Public</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <div className="pt-3 flex">
            <Button onClick={handleClose} sx={{ pr: 4 }}>
              CANCEL
            </Button>
            <Button
              onClick={editPlaylist}
              sx={{ backgroundColor: "blue", color: "white" }}
            >
              SAVE
            </Button>
          </div>
        </Box>
      </Modal>  </> :  <><Button
        variant="outlined"
        startIcon={<ModeEditOutlineIcon />}
        className="btn-newPlaylist"
        sx={{
          color: "white",
          borderColor: "white",
          m: 2,
          p: 1,
          pl: 3,
          pr: 3,
        }}
        onClick={handleOpen}
      >
        Edit Playlist
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" noValidate autoComplete="off" sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ width: "30%" }}
            >
              Edit Playlist
            </Typography>
            {hasAlbumCoverImg ? (
              <img
                src={playlist.thumbnail}
                className="editModal-albumCover--img"
                alt="album cover"
              />
            ) : (
              <Button variant="contained" component="label">
                <PhotoAlbumIcon sx={{ fontSize: 40 }} />
                Album cover
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleSelectedFile(e.target.files[0])}
                />
              </Button>
            )}
          </Box>
          <FormControl
            variant="standard"
            sx={{ backgroundColor: "white", width: "100%" }}
          >
            <Input
              id="title"
              aria-describedby="my-helper-text"
              placeholder="Title"
              value={playlist.name}
              name="name"
              onChange={handleChange}
              sx={{ mt: 4, mb: 4 }}
            />
            <Input
              id="description"
              aria-describedby="my-helper-text"
              placeholder="Description"
              value={playlist.description}
              name="description"
              onChange={handleChange}
              sx={{ mb: 4 }}
            />
          </FormControl>

          {/* Privacy */}
          <Box sx={{ maxWidth: 100 }}>
            <FormControl fullWidth>
              <NativeSelect
                onChange={handleChange}
                value={playlist.publicAccessible}
                name="publicAccessible"
              >
                <option value={false}>Private</option>
                <option value={true}>Public</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <div className="buttons-container">
            <Button onClick={handleClose} sx={{ pr: 4 }}>
              CANCEL
            </Button>
            <Button
              onClick={editPlaylist}
              sx={{ backgroundColor: "blue", color: "white" }}
            >
              SAVE
            </Button>
          </div>
        </Box>
      </Modal> 
      </>}
    </div>
  );
}
