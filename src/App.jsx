import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import PlaylistContainer from "./pages/PlaylistContainer";
import PlaylistList from "./pages/PlaylistList";
import CreatePlaylist from "./pages/CreatePlaylist";
import PlaylistCard from "./pages/PlaylistCard";
import AddNewSong from "./pages/AddNewSong";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/createPlaylist" element={<CreatePlaylist />} />
          <Route path="/playlists" element={<PlaylistContainer />}>
            <Route path="" element={<PlaylistList />} />
            <Route path=":id" element={<PlaylistCard />}>
              <Route path="addNewSong" element={<AddNewSong />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;