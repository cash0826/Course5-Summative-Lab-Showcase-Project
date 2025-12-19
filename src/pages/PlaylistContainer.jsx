import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import getAllPlaylists from "../services/PlaylistService";


function PlaylistContainer() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getAllPlaylists().then((data) => {
      setPlaylists(previous => data);
    }).catch((error) => {
      console.error("Error fetching playlists:", error);
    });
  }, []);

  const displayPlaylists = playlists.map((playlist) => (
    <li key={playlist.id}><Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link></li>
  ));

  return (
    <div >
      <NavBar />
      <h1>Curated Playlists</h1>
      <p>Pick your poison:</p>
      <ul>{displayPlaylists}</ul>
      <Outlet context={{ playlists }} />
      <Link to="/createPlaylist"><button>Create a new Playlist</button></Link>
    </div>
  )
}
export default PlaylistContainer;