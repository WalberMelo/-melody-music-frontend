import React from "react";
import "./yourplaylist.css";
import { useGetPlaylistQuery } from "../../../redux/services/melodyApi";
import { useNavigate } from "react-router-dom";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useMediaQuery } from "react-responsive";
import { Grid, Typography } from "@mui/material";

function AllPlaylists() {
  const responsive = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  const { data, isFetching, error } = useGetPlaylistQuery();
  const navigate = useNavigate();
  const playlists = data?.data;

  if (isFetching)
    return (
      <div className="loading-box">
        <div className="loading_bar"></div>
        <p className="loading_text">Loading</p>
      </div>
    );

  if (error) return <div>Error</div>;

  return (
    <>
      {responsive ? (
        <Grid xs={6}>
          <header className="mt-6 ">
            <section className="flex flex-col justify-center grow pl-11">
              <Typography>
                Your Playlists <LibraryMusicIcon sx={{ fontSize: "3rem" }} />
              </Typography>
              <Typography>{playlists.length} Playlists</Typography>
            </section>
          </header>
          <Grid
            xs={6}
            style={{
              display: "flex",
              justifyContent: "start",
              flexWrap: "wrap",
              padding: "0rem 2rem",
            }}
          >
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="flex flex-col w-[120px] h-[140px] p-4 m-2 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
              >
                <div className="h-full">
                  <img
                    alt="song_img"
                    src={playlist.thumbnail}
                    className="playlist__thumbnail--img"
                    onClick={() => navigate(`/playlist/${playlist._id}`)}
                  />
                </div>

                <Grid xs={6}>
                  <Typography className="playlist-name">
                    {playlist.name}
                  </Typography>
                </Grid>
              </div>
            ))}
          </Grid>
        </Grid>
      ) : (
        <div className="home_playlist_container">
          <header className="flex h-44 mb-1">
            <section className="flex flex-col justify-center grow ">
              <h className=" not-italic text-2xl font-black whitespace-nowrap text-ellipsis leading-80">
                Your Playlists <LibraryMusicIcon sx={{ fontSize: "3rem" }} />
              </h>
              <div>{playlists.length} Playlists</div>
            </section>
          </header>
          <div className="home_display_playlists mb-8">
            {playlists.map((playlist) => (
              <div key={playlist._id} className="playlist_album">
                <div className="relative w-full h-56 group ">
                  <img
                    alt="song_img"
                    src={playlist.thumbnail}
                    className="playlist__thumbnail--img"
                    onClick={() => navigate(`/playlist/${playlist._id}`)}
                  />
                </div>

                <div className="flex flex-col">
                  <p className="font-semibold text-sm text-white truncate">
                    {playlist.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AllPlaylists;
