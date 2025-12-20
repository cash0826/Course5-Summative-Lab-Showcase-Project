import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { getAllPlaylists } from "../services/PlaylistService";

function PlaylistContainer() {
  const [playlists, setPlaylists] = useState([]);
  // keep a copy of all playlists so filtering doesn't mutate the source
  const [allPlaylists, setAllPlaylists] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllPlaylists().then((data) => {
      setAllPlaylists(data);
      setPlaylists(data);
    }).catch((error) => {
      console.error("Error fetching playlists:", error);
    });
  }, []);

  function handleSearch (e) {
    const q = e.target.value;
    setQuery(q);

    // filter from the full list so deleting characters restores results
    if (!q) {
      setPlaylists(allPlaylists);
      return;
    }

    const filteredPlaylists = allPlaylists.filter(playlist => 
      playlist.name.toLowerCase().includes(q.toLowerCase())
    );
    setPlaylists(filteredPlaylists);
  }

  const searchBar = (
    <div>
      <input
        id="search-bar"
        type="text" 
        placeholder="Search Playlists..." 
        value={query} 
        onChange={handleSearch} 
      />
    </div>
  );

  return (
    <>
      <NavBar />
      {searchBar}
      <main>
        <h1>Curated Playlists</h1>
        <Outlet context={{ playlists, setPlaylists }} />
        <div>
          <Link to="/createPlaylist"><button>Create New Playlist</button></Link>
        </div>
      </main>
    </>
  );
}

export default PlaylistContainer;