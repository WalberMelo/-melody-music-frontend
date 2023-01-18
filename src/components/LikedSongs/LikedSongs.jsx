import React from "react";
import {
  useGetLikedSongsQuery,
  usePutLikedSongsMutation,
} from "../../redux/services/melodyApi";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Favorite } from "@mui/icons-material";

function LikedSongs({ song }) {
  const { data } = useGetLikedSongsQuery();
  const [updatePost] = usePutLikedSongsMutation();

  const favorite = async (id) => {
    await updatePost({ id: id });
  };

  // DISPLAY LIKED HEART ICON //
  //Get ids for each song object passed to player
  let songIdPassToPlayer = Object.values(song)[0];
  //Get ids for each song liked by the user
  const allLikedSongsIds = data?.songs.map((id) => id._id);
  // Check in every heart button if song is liked or not
  let isSongLiked = allLikedSongsIds?.includes(songIdPassToPlayer);

  return (
    <>
      {isSongLiked ? (
        <button onClick={() => favorite(song._id)}>
          <Favorite className="favoriteIcon" />
        </button>
      ) : (
        <button onClick={() => favorite(song._id)}>
          <FavoriteBorderIcon className="favoriteIcon" />
        </button>
      )}
    </>
  );
}

export default LikedSongs;
