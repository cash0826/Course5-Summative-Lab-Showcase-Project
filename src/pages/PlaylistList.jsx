import { Link, Outlet, useOutletContext } from "react-router-dom";

function PlaylistList() {
  const { playlists, setPlaylists } = useOutletContext();

  if (playlists.length === 0) {
    return <p>Loading Your Curated Playlists...</p>;
  }

  const cards = playlists.map((playlist) => (
    <div key={playlist.id} className="playlist-card">
      <h3>{playlist.name}</h3>
      <p>{playlist.description}</p>
      <Link to={`${playlist.id}`}><button>View Playlist</button></Link>
    </div>
  ));

  return (
    <div>
      <h2>Pick your Poison:</h2>
      <Outlet context={{ playlists }} />
      <div className="playlist-list">
        {cards}
      </div>
    </div>
  )
}

export default PlaylistList;