import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useOutletContext, useParams } from "react-router-dom";
import { updatePlaylist } from "../services/PlaylistService";

function AddNewSong() {
  const { playlists, setPlaylists } = useOutletContext();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const { id } = useParams();
  const inputRef = useRef(null);
  const playlist = playlists.find(p => p.id === id);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function handleSubmit(e) {
      e.preventDefault();
      const newSong = {
          id: uuidv4(),
          title: title,
          artist: artist
      };
      await updatePlaylist(playlist.id, newSong, playlist.songs).then(playlist => {
          setPlaylists(previous => playlists.map(p => p.id === playlist.id ? playlist : p));
      });
      setTitle("");
      setArtist("");
  }

  return (
    <>
      <h2>Add a New Song</h2>
      <form className="song-form" onSubmit={handleSubmit}>
        <label>Song:</label>
        <input 
          type="text" 
          name="title"
          placeholder="Song Title"
          ref={inputRef}
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <br />
        <label>Artist:</label>
        <input 
          type="text" 
          name="artist" 
          placeholder="Artist Name"
          required 
          value={artist}
          onChange={(e) => setArtist(e.target.value)} />
        <button type="submit">Add Song</button>
        <br/>
      </form>
    </>
  )
}

export default AddNewSong;