import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { getAllPlaylists } from "../services/PlaylistService";

function PlaylistContainer() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getAllPlaylists().then((data) => {
      setPlaylists(previous => data);
    }).catch((error) => {
      console.error("Error fetching playlists:", error);
    });
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <h1>Curated Playlists</h1>
        {/* <PlaylistList playlists={playlists} /> */}
        <Outlet context={{ playlists }} />
        <div>
          <Link to="/createPlaylist"><button>Create New Playlist</button></Link>
        </div>
      </main>
    </>
  );
}

export default PlaylistContainer;