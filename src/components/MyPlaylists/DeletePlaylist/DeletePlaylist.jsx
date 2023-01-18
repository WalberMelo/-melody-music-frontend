import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export const DeletePlaylist = (id) => {
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const deletePlaylist = async (playlistId) => {
    const result = await fetch(
      `https://melody-music-stream-production.up.railway.app/playlist/${playlistId}`,
      {
        method: "DELETE",
        headers: { auth_token: token },
        id: playlistId,
      }
    );

    navigate(`/playlists`);
  };

  return <DeleteIcon onClick={() => deletePlaylist(id)} />;
};
