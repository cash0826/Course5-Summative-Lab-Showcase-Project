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