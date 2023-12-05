let accessToken;
const clientId = "0dc73d2ac41b464c96c3e07fb6835ec0";
const redirectURI = "http://localhost:3000/";

const Spotify = {
  
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiration = window.location.href.match(/expires_in=([^&]*)/);
    
    if (urlAccessToken && urlExpiration) {
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiration[1]);
      window.setTimeout( () => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = redirect;
    }
  },
  
  search(searchTerm) {
    const accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      { headers: {Authorization: `Bearer ${accessToken}`} }
    )
    .then( response => response.json() )
    .then( jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(tracks => ({
        id: tracks.id,
        name: tracks.name,
        artist: tracks.artists[0].name,
        album: tracks.album.name,
        uri: tracks.uri
        })
      );
    }
  )},

  savePlaylist(playlistName, playlistURIs) {
    if (!playlistName || !playlistURIs) { return };

    const accessToken = this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`};
    let userId, playlistId;

    fetch('https://api.spotify.com/v1/me',
      { headers: headers } )
    .then( response => response.json() )
    .then ( jsonResponse => {
      userId = jsonResponse.id;
    })

    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
      { headers: headers,
        method: "POST",
        body: JSON.stringify( { name: playlistName } )
      })
    .then( response => response.json() )
    .then( jsonResponse => {
      playlistId = jsonResponse.id;
    })
    
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      { headers: headers,
        method: "POST",
        body: JSON.stringify( { uris: playlistURIs } )
      })
    // .then ( response => response.json() )
   
  }
}

export default Spotify;