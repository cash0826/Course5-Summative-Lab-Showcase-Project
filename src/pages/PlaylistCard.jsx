import { Link, useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import SongForm from "./SongForm";

function PlaylistCard() {
  const [showForm, setShowForm] = useState(false);
  const { playlists } = useOutletContext();
  const params = useParams();
  const playlist = playlists.find(p => p.id.toString() === params.id);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  if (!playlist) {
    return <p>Playlist not found.</p>;
  }

  // AI suggested fix for songs not being an array
  // const songs = Array.isArray(playlist.songs) ? playlist.songs : (playlist.songs ? [playlist.songs] : []);

  const displayPlaylists = playlist.songs.map((song) => (
    <li key={song.id ?? `${song.title}-${song.artist}`}>{song.title} by {song.artist}</li>
  ));

  return (
    <div className="playlist-details">
      <h3>{playlist.name}</h3>
      <p>{playlist.description}</p>
      <ol>
        {displayPlaylists}
      </ol>
      <div>
        {showForm ? <SongForm /> : null}
        <div>
          <br/>
          <button onClick={handleClick}>
            {showForm ? "Hide Form" : "Add New Song"}
          </button>
        </div>
        <br/>
      </div>
      <div>
        <Link to="/playlists"><button>Back to Playlists</button></Link>
      </div>
    </div>
  );
}

export default PlaylistCard;