import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function PlaylistContainer() {
  return (
    <div>
      <NavBar />
      <h1>Playlist Container</h1>
      <Outlet />
    </div>
  )
}
export default PlaylistContainer;