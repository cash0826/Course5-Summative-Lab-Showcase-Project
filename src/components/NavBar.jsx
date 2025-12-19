import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <br/>
      <Link to="/about">About</Link>
      <br/>
      <Link to="/playlists">Playlists</Link>
      <br/>
      <Link to="/playlists/createPlaylist">Create Playlist</Link>
    </nav>
  )
}

export default NavBar;