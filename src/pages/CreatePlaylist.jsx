import NavBar from "../components/NavBar";
import { useState } from "react";
import { addPlaylist } from "../services/PlaylistService";

function CreatePlaylist() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Logic to create a new playlist goes here
    const newPlaylist = {
      name: name,
      description: description,
      songs: []
    };
    addPlaylist(newPlaylist);
    setName("");
    setDescription("");
    alert("Playlist Created!");
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
            placeholder="My Amazing New Playlist"
            value={name} 
            onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea 
            name="description"
            placeholder="A collection of my favorite tunes."
            value={description} 
            onChange={(e) => setDescription(e.target.value)}></textarea>
        </label>
        <br />
        <button type="submit">Create Playlist</button>
      </form>
    </div>
  )
}

export default CreatePlaylist;