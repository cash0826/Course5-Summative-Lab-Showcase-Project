

function PlaylistDetails({ playlist }) {
  return (
    <div>
      <h1>{playlist.name}</h1>
      <p>{playlist.description}</p>
    </div>
  );
}

export default PlaylistDetails;