const baseUrl = "http://localhost:3001";

async function getAllPlaylists() {
  const url = `${baseUrl}/playlists`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error(`Error fetching playlists: ${response.statusText}`);
  return [];
}

export default getAllPlaylists;

