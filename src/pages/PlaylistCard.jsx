import { Link, useOutletContext, useParams } from "react-router-dom";

function PlaylistCard() {
  const { playlists } = useOutletContext();
  const params = useParams();
  const playlist = playlists.find(p => p.id.toString() === params.id);

  if (!playlist) {
    return <p>Playlist not found.</p>;
  }
  
  return (
    <div>
      <h3>{playlist.name}</h3>
      <p>{playlist.description}</p>
      <ol>
        {playlist.songs.map((song) => (
          <li key={song.id}>{song.title} by {song.artist}</li>
        ))}
      </ol>
      <Link to={`addNewSong`}><button>Add New Song</button></Link>
    </div>
  );
}

export default PlaylistCard;