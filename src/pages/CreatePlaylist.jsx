import NavBar from "../components/NavBar";
import { useState, useRef, useEffect, useId } from "react";
import { addPlaylist } from "../services/PlaylistService";
import { useNavigate } from "react-router-dom";

function CreatePlaylist() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const inputRef = useRef(null);
  const id = useId();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    // Logic to create a new playlist goes here
    const newPlaylist = {
      name: name,
      description: description,
      songs: []
    };
    await addPlaylist(newPlaylist);
    setName("");
    setDescription("");
    alert("Playlist Created!");
    navigate("/playlists");
  }

  return (
    <div>
      <NavBar />
      <form className="create-playlist-form" onSubmit={handleSubmit}>
        <h1>Create a New Playlist</h1>
        <label>
          Playlist Name:
          <input 
            type="text" 
            name="name"
            id={id}
            ref={inputRef}
            placeholder="My Amazing New Playlist"
            value={name}
            required
            onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea 
            name="description"
            placeholder="A collection of my favorite tunes."
            value={description} 
            required
            onChange={(e) => setDescription(e.target.value)}></textarea>
        </label>
        <br />
        <button type="submit">Create Playlist</button>
      </form>
    </div>
  )
}

export default CreatePlaylist;