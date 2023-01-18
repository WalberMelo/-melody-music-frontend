import { Clear, SearchRounded } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./SearchBar.css";

const SearchBar = () => {
  const responsive = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  const [search, setSearch] = useState({
    query: "",
    list: [],
  });
  const [data, setData] = useState({});

  const handleSearch = async (e) => {
    const results = data.filter((result) => {
      if (e.target.value === "") return result;
      return result.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearch({
      query: e.target.value,
      list: results,
    });
  };

  return (
    <>
    {responsive ?
    <div className="container">
      <div className="search_input_container">
        <IconButton>
          <SearchRounded />
        </IconButton>
        <input
          type="text"
          placeholder="SearchBar for songs and playlists"
          onChange={handleSearch}
          value={search}
          />
        <IconButton onClick={() => setSearch("")}>
          <Clear />
        </IconButton>
      </div>

      <div className="progress_container">
        <CircularProgress />
      </div>

      <div className="results_container">
        <div className="songs_container">
          <Fragment></Fragment>
        </div>

        <div className="playlists_container"></div>
      </div>
    </div> :    <div className="container">
      <div className="search_input_container">
        <IconButton>
          <SearchRounded />
        </IconButton>
        <input
          type="text"
          placeholder="SearchBar for songs and playlists"
          onChange={handleSearch}
          value={search}
          />
        <IconButton onClick={() => setSearch("")}>
          <Clear />
        </IconButton>
      </div>

      <div className="progress_container">
        <CircularProgress />
      </div>

      <div className="results_container">
        <div className="songs_container">
          <Fragment></Fragment>
        </div>

        <div className="playlists_container"></div>
      </div>
    </div>}
          </>
  );
};
export default SearchBar;
