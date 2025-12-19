import { Link, useOutletContext, useParams } from "react-router-dom";

function PlaylistDetails() {
  const { playlists } = useOutletContext();
  const { id } = useParams();

  const playlist = playlists.find(pl => pl.id === parseInt(id));

  if (!playlist) {
    return <p>Playlist not found.</p>;
  }

  return (
    <div>
      <h1>{playlist.name}</h1>
      <ol>
        {playlist.songs.map((song) => (
          <li key={song.id}>{song.title} by {song.artist}</li>
        ))}
      </ol>
      <Link to="addNewSong"><button>Add New Song</button></Link>
    </div>
  );
}

export default PlaylistDetails;