

function AddNewSong() {
  return (
    <div>
      <h1>Add New Song</h1>
      <form>
        <label>
          Song Title:
          <input type="text" name="title" />
        </label>
        <br />
        <label>
          Artist:
          <input type="text" name="artist" />
        </label>
        <br />
        <button type="submit">Add Song</button>
      </form>
    </div>
  )
}

export default AddNewSong;