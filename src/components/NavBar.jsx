import React from 'react'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import "./NavBar.css";

function NavBar() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/playlists">Playlists</Link>
      <Link to="/createPlaylist">Create Playlist</Link>
      <button onClick={() => {setTheme(theme === "light" ? "dark" : "light")}}>Toggle Theme</button>
    </nav>
  )
}

export default NavBar;