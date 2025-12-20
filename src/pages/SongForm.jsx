import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { updatePlaylist } from "../services/PlaylistService";

function AddNewSong() {
  const { playlists } = useOutletContext();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const playlist = playlists.find(p => p.id === id);

  function handleSubmit(e) {
      e.preventDefault();
      const newSong = {
          id: uuidv4(),
          title: title,
          artist: artist
      };
      updatePlaylist(playlist.id, newSong, playlist.songs);
      setTitle("");
      setArtist("");
      alert("Song added to playlist!");
      navigate(`/playlists/${playlist.id}`);
  }

  return (
    <div>
      <h5>Add New Song</h5>
      <form onSubmit={handleSubmit}>
        <label>Song:</label>
        <input 
          type="text" 
          name="title"
          placeholder="Song Title"
          required 
          onChange={(e) => setTitle(e.target.value)} />
        <br />
        <label>Artist:</label>
        <input 
          type="text" 
          name="artist" 
          placeholder="Artist Name"
          required 
          onChange={(e) => setArtist(e.target.value)} />
        <br />
        <button type="submit">Add Song</button>
        <br/>
      </form>
    </div>
  )
}

export default AddNewSong;