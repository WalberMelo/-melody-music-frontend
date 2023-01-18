import React, { useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetPlaylistQuery } from "../../redux/services/melodyApi";
import { useNavigate } from "react-router-dom";
import CreatePlaylistModal from "./CreatePlaylist/CreatePlaylistModal";
import { useMediaQuery } from "react-responsive";

function Playlists() {
  const { data, isFetching, error } = useGetPlaylistQuery();
  const playlists = data?.data;
  const token = localStorage.getItem("userToken");
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const responsive = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  const deletePlaylist = async (playlistId) => {
    const result = await fetch(
      `https://melody-music-stream-production.up.railway.app/playlist/${playlistId}`,
      {
        method: "DELETE",
        headers: { auth_token: token },
        id: playlistId,
      }
    );

    navigate("/playlists");
  };

  const getPlaylist = async (playlistId) => {
    await fetch(
      `https://melody-music-stream-production.up.railway.app/playlist/${playlistId}`,
      {
        method: "GET",
        headers: { auth_token: token },
        id: playlistId,
      }
    );
    navigate(`/playlist/${playlistId}`);
  };

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
        <div>
          <header className="flex h-44 mb-1">
            <section className="flex flex-col justify-center grow ml-5">
              <h1 className=" not-italic text-3xl font-black whitespace-nowrap text-ellipsis leading-80">
                Your Playlists <LibraryMusicIcon sx={{ fontSize: "3rem" }} />
              </h1>
              <div>{playlists.length} Playlists</div>
            </section>
          </header>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            <div className="flex flex-col w-[200px] h-[230px]  p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
              <div className="relative w-full h-56 group">
                <PlaylistAddIcon sx={{ fontSize: "100px", marginTop: "-8%" }} />
              </div>

              <div className="mt-4 flex flex-col">
                <CreatePlaylistModal />
              </div>
            </div>
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="flex flex-col w-[200px] h-[230px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer playlist-delete"
                onMouseEnter={() => setIsHovering(playlist._id)}
                onMouseLeave={() => setIsHovering(null)}
              >
                {isHovering === playlist._id && (
                  <DeleteIcon
                    onClick={() => deletePlaylist(playlist._id)}
                    style={{
                      position: "absolute",
                      zIndex: 999,
                      top: 1,
                      right: 0,
                      color: "white",
                    }}
                  />
                )}

                <div className="relative w-full h-56 group">
                  <img
                    alt="song_img"
                    src={playlist.thumbnail}
                    className="playlist__thumbnail--img"
                    onClick={() => getPlaylist(playlist._id)}
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
      ) : (
        <div className="home_playlist_container">
          <header className="flex h-44 mb-1">
            <section className="flex flex-col justify-center grow ml-5">
              <h1 className=" not-italic text-3xl font-black whitespace-nowrap text-ellipsis leading-80">
                Your Playlists <LibraryMusicIcon sx={{ fontSize: "3rem" }} />
              </h1>
              <div>{playlists?.length} Playlists</div>
            </section>
          </header>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            <div className="flex flex-col w-[200px] h-[230px]  p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
              <div className="relative w-full h-56 group">
                <PlaylistAddIcon sx={{ fontSize: "100px", marginTop: "-8%" }} />
              </div>

              <div className="mt-4 flex flex-col">
                <CreatePlaylistModal />
              </div>
            </div>
            {playlists?.map((playlist) => (
              <div
                key={playlist._id}
                className="flex flex-col w-[200px] h-[230px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer playlist-delete"
                onMouseEnter={() => setIsHovering(playlist._id)}
                onMouseLeave={() => setIsHovering(null)}
              >
                {isHovering === playlist._id && (
                  <DeleteIcon
                    onClick={() => deletePlaylist(playlist._id)}
                    style={{
                      position: "absolute",
                      zIndex: 999,
                      top: 1,
                      right: 0,
                    }}
                  />
                )}

                <div className="relative w-full h-56 group">
                  <img
                    alt="song_img"
                    src={playlist.thumbnail}
                    className="playlist__thumbnail--img"
                    onClick={() => getPlaylist(playlist._id)}
                  />
                </div>

                <div className=" flex flex-col">
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

export default Playlists;
