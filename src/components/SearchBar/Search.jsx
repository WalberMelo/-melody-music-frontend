import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { Clear, SearchRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import HeadsetIcon from "@mui/icons-material/Headset";

//Components
import { useGetAllSongsQuery } from "../../redux/services/melodyApi";
import convertDuration from "../../functions/ConvertDuration";
import SongCart from "../Top/SongCart";
import BrowserAll from "./BrowserAll";

import "./SearchBar.css";
import "./search.css";

export default function Search() {
  //Handle player
  const { data, isFetching, error } = useGetAllSongsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  //Handle Search explorer feature
  const [hasQuery, setHasQuery] = useState(false);
  const [inputTrack, setInputTrack] = useState("");
  const [querySong, setQuerySong] = useState({
    song: "",
    i: "",
  });
  console.log("Query song: ", querySong);
  const responsive = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  const handleSearch = (event) => {
    setInputTrack(event.target.value);
  };

  function handleSearchClear(e) {
    setInputTrack("");
    setHasQuery(false);
  }

  const handleClick = () => {
    if (Object.keys(querySong).length === 0) {
      return;
    } else {
      setHasQuery(true);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleClick();
    } else return;
  };

  const searchBar = (
    <div onKeyPress={(e) => handleEnter(e)}>
      <div className="search_input_container">
        <SearchRounded sx={{ marginRight: 2 }} onClick={handleClick} />
        <input
          type="text"
          placeholder="Explorer"
          name="songTitle"
          onChange={handleSearch}
          value={inputTrack}
        />
        <IconButton onClick={handleSearchClear}>
          <Clear />
        </IconButton>
      </div>
    </div>
  );

  if (isFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );

  if (error) return <div>Error</div>;

  return (
    <main>
      {" "}
      {responsive ? (
        <>
          <header className="search_bar">{searchBar}</header>
          <div className="search_container_responsive">
            {hasQuery ? (
              <div className="top-result">
                <h2 className="mb-3 not-italic font-bold font-mons text-xl text-white">
                  Top result <HeadsetIcon sx={{ fontSize: "2rem" }} />
                </h2>
                {data.songs
                  .filter((song) => {
                    if (inputTrack === "") {
                      setHasQuery(false);
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
                  .map((song, i) => {
                    return (
                      <div className="top-result">
                        <SongCart
                          key={song._id}
                          song={song}
                          isPlaying={isPlaying}
                          activeSong={activeSong}
                          data={data}
                          i={i}
                          convertDuration={convertDuration}
                        />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <aside className="browser-all">
                <h1 className="mb-3 not-italic font-bold font-mons text-xl text-white">
                  Browser all
                </h1>
                <div>
                  <BrowserAll />
                </div>
              </aside>
            )}
          </div>{" "}
        </>
      ) : (
        <>
          {" "}
          <header className="search_bar">{searchBar}</header>
          <div className="search_container">
            {hasQuery ? (
              <div className="top-result">
                <h2 className="mb-3 not-italic font-bold font-mons text-xl text-white">
                  Top result <HeadsetIcon sx={{ fontSize: "2rem" }} />
                </h2>
                {data.songs
                  .filter((song) => {
                    if (inputTrack === "") {
                      setHasQuery(false);
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
                  .map((song, i) => {
                    return (
                      <div className="top-result">
                        <SongCart
                          key={song._id}
                          song={song}
                          isPlaying={isPlaying}
                          activeSong={activeSong}
                          data={data}
                          i={i}
                          convertDuration={convertDuration}
                        />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <aside className="browser-all">
                <h1 className="mb-3 not-italic font-bold font-mons text-xl text-white">
                  Browser all
                </h1>
                <div>
                  <BrowserAll />
                </div>
              </aside>
            )}
          </div>{" "}
        </>
      )}
    </main>
  );
}
