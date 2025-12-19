import NavBar from "../components/NavBar";

function CreatePlaylist() {
  return (
    <div>
      <NavBar />
      <form>
        <h1>Create a New Playlist</h1>
        <label>
          Playlist Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description"></textarea>
        </label>
        <br />
        <button type="submit">Create Playlist</button>
      </form>
    </div>
  )
}

export default CreatePlaylist;