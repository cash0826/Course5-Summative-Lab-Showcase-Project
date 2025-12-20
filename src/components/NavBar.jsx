import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/playlists">Playlists</Link>
      <Link to="/createPlaylist">Create Playlist</Link>
    </nav>
  )
}

export default NavBar;