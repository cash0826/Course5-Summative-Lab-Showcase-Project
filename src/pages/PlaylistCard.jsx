import { Link, useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import SongForm from "./SongForm";
import { deletePlaylist } from "../services/PlaylistService";

function PlaylistCard() {
  const [showForm, setShowForm] = useState(false);
  const { playlists, setPlaylists } = useOutletContext();
  const params = useParams();
  const playlist = playlists.find(p => p.id.toString() === params.id);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  async function handleDelete() {
    await deletePlaylist(playlist.id);
    setPlaylists(playlists.filter(p => p.id !== playlist.id));
  }

  if (!playlist) {
    return <p>Playlist not found.</p>;
  }

  const displayPlaylists = playlist.songs.map((song) => (
    <li key={song.id ?? `${song.title}-${song.artist}`}>{song.title} by {song.artist}</li>
  ));

  return (
    <div className="playlist-details">
      <h2>{playlist.name}</h2>
      <p>{playlist.description}</p>
      <ol className="song-list">
        {displayPlaylists}
      </ol>
      {showForm ? <SongForm /> : null}
        <button onClick={handleClick}>
          {showForm ? "Hide Form" : "Add New Song"}
        </button>
      <button onClick={handleDelete}>Delete Playlist</button>
      <div>
        <Link to="/playlists"><button>Back to Playlists</button></Link>
      </div>
    </div>
  );
}

export default PlaylistCard;