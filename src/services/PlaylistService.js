const baseUrl = "http://localhost:3001";

export async function getAllPlaylists() {
  const url = `${baseUrl}/playlists`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error(`Error fetching playlists: ${response.statusText}`);
  return [];
}

export async function addPlaylist(newPlaylistData) {
  const url = `${baseUrl}/playlists`;
  if (newPlaylistData) {
    const response = await fetch (url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newPlaylistData)
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Error adding playlist: ${response.statusText}`);
    return null;
  }
}

export async function updatePlaylist(playlistId, newSongData, songs) {
  const url = `${baseUrl}/playlists/${playlistId}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ songs: [...songs, newSongData] })
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error(`Error adding song to playlist: ${response.statusText}`);
}

export async function deletePlaylist(playlistId) {
  const url = `${baseUrl}/playlists/${playlistId}`;
  const response = await fetch(url, {
    method: "DELETE"
  });
  if (response.ok) {
    return response;
  }
  throw new Error(`Error deleting playlist: ${response.statusText}`);
}