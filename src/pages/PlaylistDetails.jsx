import { Outlet } from "react-router-dom";

function PlaylistDetails({ playlist }) {
  return (
    <div>
      <h1>{playlist.name}</h1>
      <p>{playlist.description}</p>
      <Outlet />
    </div>
  );
}

export default PlaylistDetails;