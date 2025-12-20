import { useState } from "react";

function AddNewSong() {
const [title, setTitle] = useState("");
const [artist, setArtist] = useState("");

function handleSubmit(e) {
    e.preventDefault();
    const newSong = { title, artist };
    console.log("New song added:", newSong);
    setTitle("");
    setArtist("");
}

  return (
    <div>
      <h1>Add New Song</h1>
      <form onSubmit={handleSubmit}>
        <label>Song Title:</label>
        <input 
          type="text" 
          name="title" 
          required />
        <br />
        <label>Artist:</label>
        <input 
          type="text" 
          name="artist" 
          required />
        <br />
        <button type="submit">Add Song</button>
        <br/>
      </form>
    </div>
  )
}

export default AddNewSong;