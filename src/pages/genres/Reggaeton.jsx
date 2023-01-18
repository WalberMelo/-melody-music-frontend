import React, { useState } from "react";
import "./genres.css";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { Clear, SearchRounded } from "@mui/icons-material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

//Components
import SongCard from "../../components/SongCard/SongCard";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useGetAllSongsQuery } from "../../redux/services/melodyApi";
import convertDurationPlaylist from "../../functions/ConvertDurationPlaylist";
import convertDuration from "../../functions/ConvertDuration";

function Reggaeton() {
  const { data, isFetching, error } = useGetAllSongsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [inputTrack, setInputTrack] = useState("");

  const songs = data.songs.filter((music) => music.genre === "Reggaeton");
  console.log(songs);

  const handleSearch = (event) => {
    setInputTrack(event.target.value);
  };
  function handleSearchClear(e) {
    setInputTrack("");
  }

  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error />;

  const totalDuration = songs.map((song) => song.duration);

  return (
    <>
      (
      <>
        <div className="container-right">
          <header>
            <section className="info">
              <h6>Melody</h6>
              <h1>
                Reggaeton
                <LibraryMusicIcon sx={{ fontSize: "3rem" }} />
              </h1>
              <div className="details">
                <p>{songs.length} Songs</p>
                <p id="dot">&bull;</p>
                <p>{convertDurationPlaylist(totalDuration)}</p>
              </div>
            </section>
            <div className="container">
              <div className="search_input_container">
                <IconButton>
                  <SearchRounded />
                </IconButton>
                <input
                  type="text"
                  placeholder="Search your favorite song"
                  name="songTitle"
                  onChange={handleSearch}
                  value={inputTrack}
                />
                <IconButton onClick={handleSearchClear}>
                  <Clear />
                </IconButton>
              </div>
            </div>
          </header>
          <table className="favorites-table animate-slideup ">
            <tbody className="favorites_line__bottom">
              {songs
                .filter((song) => {
                  if (inputTrack === "") {
                    return song;
                  } else if (
                    song.artist
                      .toLowerCase()
                      .includes(inputTrack.toLowerCase()) ||
                    song.title
                      .toLowerCase()
                      .includes(inputTrack.toLocaleLowerCase())
                  ) {
                    return song;
                  }
                })
                .map((song, i) => (
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
      </>
      )
    </>
  );
}

export default Reggaeton;
