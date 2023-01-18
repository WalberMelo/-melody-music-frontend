import "./home.css";
import React from "react";
import Top from "../Top/Top";
import { MelodyPlaylist } from "./melodyPlaylists/MelodyPlaylist";
import YourPlaylists from "./YourPlaylists/YourPlaylists";
import ExplorerSongs from "./DiscoverSong/DiscoverSongs";
import HomeHeader from "./HomeHeader/HomeHeader";
import SideMenu from "../SideMenu/SideMenu";
import { useMediaQuery } from "react-responsive";
import { Grid } from "@mui/material";

function Home() {
  const responsive = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  return (
    <>
      <SideMenu />
     
      {responsive ?
<>      <Grid xs={12} style={{display:'flex'}}>
      <HomeHeader />
    </Grid>
      <Grid xs={6} spacing={2}>
        <Grid xs={6}>
          <div className="home_playlist__allPlaylist">
            <YourPlaylists />
          </div>
          <div className="home_playlist__randomPlaylist">
            <MelodyPlaylist />
          </div>
        </Grid>
        <Grid xs={6}>
          <div className="home_aside__top">
            <Top />
          </div>
          <div className="home_aside__explorerSongs">
            <ExplorerSongs />
          </div>
        </Grid>
      </Grid>
      </> : <><Grid className="home_header">
        <HomeHeader />
      </Grid> 
      <div className="home_container">
        <div className="home_playlist">
          <div className="home_playlist__allPlaylist">
            <YourPlaylists />
          </div>
          <div className="home_playlist__randomPlaylist">
            <MelodyPlaylist />
          </div>
        </div>
        <aside className="home_aside">
          <div className="home_aside__top">
            <Top />
          </div>
          <div className="home_aside__explorerSongs">
            <ExplorerSongs />
          </div>
        </aside>
      </div> </>}
    </>
  );
}

export default Home;
