import NavBar from "../components/NavBar";

function About() {
  return (
    <div>
      <NavBar/>
      <h1>About Pick Your Playlist</h1>
      <p>Whether you're looking for curated playlists or want to create your own, we've got you covered!</p>
      <h2>Features</h2>
      <ul>
        <li>Browse a variety of curated playlists.</li>
        <li>Create and manage your own playlists.</li>
        <li>Add new songs to existing playlists.</li>
      </ul>
      <h2>Get Started</h2>
      <p>To get started, head over to the Playlists section and explore the available options. Happy listening!</p>
    </div>
  );
}

export default About;