import React, { useState } from "react";
import "./Favorites.css";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { Clear, SearchRounded } from "@mui/icons-material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

//Components
import SongCard from "../SongCard/SongCard";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { useGetLikedSongsQuery } from "../../redux/services/melodyApi";
import convertDurationPlaylist from "../../functions/ConvertDurationPlaylist";
import convertDuration from "../../functions/ConvertDuration";
import { useMediaQuery } from "react-responsive";

function Favorites() {
  const { data, isFetching, error } = useGetLikedSongsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [inputTrack, setInputTrack] = useState("");
  const responsive = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  const handleSearch = (event) => {
    setInputTrack(event.target.value);
  };
  function handleSearchClear(e) {
    setInputTrack("");
  }

  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error />;

  const totalDuration = data.songs.map((song) => song.duration);

  return (
    <>
      (
      <>
      {responsive ? 
        <div className="container-right-responsive">
          <header>
            <section className="info">
              <h6>Your songs</h6>
              <h1>
                Favorites <LibraryMusicIcon sx={{ fontSize: "3rem" }} />
              </h1>
              <div className="details">
                <p>{data.songs.length} Songs</p>
                <p id="dot">&bull;</p>
                <p>{convertDurationPlaylist(totalDuration)}</p>
              </div>
            
            
              <div className="search_input_container-responsive">
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
            </section>
          </header>
          <table className="favorites-table animate-slideup ">
            <tbody className="favorites_list-responsive">
              {data.songs
                .filter((song) => {
                  if (inputTrack === "") {
                    return song;
                  } else if (
                    song.title.toLowerCase().includes(inputTrack.toLowerCase())
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
        </div> : <div className="container-right">
          <header>
            <section className="info">
              <h6>Your songs</h6>
              <h1>
                Favorites <LibraryMusicIcon sx={{ fontSize: "3rem" }} />
              </h1>
              <div className="details">
                <p>{data.songs.length} Songs</p>
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
              {data.songs
                .filter((song) => {
                  if (inputTrack === "") {
                    return song;
                  } else if (
                    song.title.toLowerCase().includes(inputTrack.toLowerCase())
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
        }
      </>
      )
    </>
  );
}

export default Favorites;
