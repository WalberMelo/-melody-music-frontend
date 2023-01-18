import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../hooks/useFirebase";
import SignInSide from "../components/Login/Login";
import Logout from "../components/Logout.jsx";
import ForgotPassword from "../components/Login/ForgotPassword.jsx";
import Signup from "../components/SignIn/SignIn.jsx";
import EditUser from "../components/EditUser/EditUser";
import Home from "../components/Home/Home";
import AdminView from "../components/Account/AdminView/AdminView";
import Profile from "../components/Profile/Profile";
import ResetPassword from "../components/ResetPassWord/ResetPassword";
import Favorites from "../components/Favorites/Favorites";
import MusicPlayer from "../components/MusicPlayer/index";
import Songs from "../components/CreateSong/SongTable";
import Playlists from "../components/MyPlaylists/Playlists";
import PlaylistEdit from "../components/MyPlaylists/EditPlaylist/PlaylistEdit";
import SideMenu from "../components/SideMenu/SideMenu";
import UserPlaylist from "../components/MyPlaylists/EditPlaylist/UserPlaylist";
import PublicPlaylist from "../components/Home/melodyPlaylists/PublicPlaylist";
import Search from "../components/SearchBar/Search";
import Pop from "../pages/genres/Pop";
import Classic from "../pages/genres/Classic";
import Rock from "../pages/genres/Rock";
import Techno from "../pages/genres/Techno";
import Rap from "../pages/genres/Rap";
import Reggaeton from "../pages/genres/Reggaeton";
import Latina from "../pages/genres/Latina";
import Alternative from "../pages/genres/Alternative";
import Acoustic from "../pages/genres/Acoustic";

export default function RouterApp() {
  const { activeSong } = useSelector((state) => state.player);
  return (
    <div>
      <Router>
        <AuthProvider>
          <div>
            <Routes>
              <Route path="/" element={<SignInSide />} />

              <Route
                path="/home"
                element={
                  <div>
                    <Home />
                  </div>
                }
              />
              <Route
                path="/favorites"
                element={
                  <>
                    <SideMenu />
                    <Favorites />
                  </>
                }
              />
              <Route
                path="/acoustic"
                element={
                  <>
                    <SideMenu />
                    <Acoustic />
                  </>
                }
              />
              <Route
                path="/alternative"
                element={
                  <>
                    <SideMenu />
                    <Alternative />
                  </>
                }
              />
              <Route
                path="/reggaeton"
                element={
                  <>
                    <SideMenu />
                    <Reggaeton />
                  </>
                }
              />
              <Route
                path="/latina"
                element={
                  <>
                    <SideMenu />
                    <Latina />
                  </>
                }
              />
              <Route
                path="/pop"
                element={
                  <>
                    <SideMenu />
                    <Pop />
                  </>
                }
              />
              <Route
                path="/rock"
                element={
                  <>
                    <SideMenu />
                    <Rock />
                  </>
                }
              />
              <Route
                path="/classic"
                element={
                  <>
                    <SideMenu />
                    <Classic />
                  </>
                }
              />
              <Route
                path="/techno"
                element={
                  <>
                    <SideMenu />
                    <Techno />
                  </>
                }
              />
              <Route
                path="/rap"
                element={
                  <>
                    <SideMenu />
                    <Rap />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <SideMenu />
                    <Profile />
                  </>
                }
              />
              <Route path="/admin" element={<AdminView />} />
              <Route
                path="/user/resetpassword/:token"
                element={<ResetPassword />}
              />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route
                path="/signup"
                element={
                  <>
                    <Signup />
                  </>
                }
              />
              <Route
                path="/logout"
                element={
                  <>
                    <SideMenu />
                    <Logout />
                  </>
                }
              />
              <Route
                path="/edit"
                element={
                  <>
                    <SideMenu />
                    <EditUser />
                  </>
                }
              />

              <Route
                path="/songs"
                element={
                  <>
                    <SideMenu />
                    <Songs />
                  </>
                }
              />
              <Route
                path="/playlists"
                element={
                  <>
                    <SideMenu />
                    <Playlists />
                  </>
                }
              />
              <Route
                path="/playlist-edit"
                element={
                  <>
                    <SideMenu />
                    <PlaylistEdit />
                  </>
                }
              />
              <Route
                path="/search"
                element={
                  <>
                    <SideMenu />
                    <Search />
                  </>
                }
              />
              <Route
                path="/playlist/public/:id"
                element={
                  <>
                    <SideMenu />
                    <PublicPlaylist />
                  </>
                }
              />
              <Route
                path="/playlist/:id"
                element={
                  <>
                    <SideMenu />
                    <UserPlaylist />
                  </>
                }
              />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
      {activeSong?.title && (
        <div className="fixed h-28 bottom-0 left-0 right-0 flex animate-slideup bg-white rounded-t-3xl z-50">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}
