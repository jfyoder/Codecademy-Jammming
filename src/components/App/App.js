import React, { useState } from "react"
import './App.css';
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import Spotify from "../../util/Spotify.js";

function App() {
  const [searchResults, setSearchResults] = useState([
    {name: "Funk You Up", artist: "The Funking Crew", album: "Whiz!", id: 1},
    {name: "Welcome to Hell", artist: "John Satan", album: "Thieves Inc.", id: 2},
    {name: "The Groove", artist: "Zorro", album: "album1", id: 3}
  ]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    {name: "The Groove", artist: "Zorro", album: "album1", id: 3}
  ]);

  const addTrack = (track) => {
    if (playlistTracks.find( (elem) => elem.id === track.id ) ) {
      return;
    }
    setPlaylistTracks( prev => [...prev, track] );
  }
  
  const removeTrack = (track) => {
    if (playlistTracks.find( (elem) => elem.id === track.id ) ) {
      setPlaylistTracks( playlistTracks.filter( (elem) => elem.id !== track.id ) )
    }
  }

  const updatePlaylistName = (listName) => {
    setPlaylistName(listName);
  }

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map( (song) => song.id );
    return trackURIs;
  }

  const search = (term) => {
    alert(term);
  }
  
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar
          onSearch={search}
        />
        <div className="App-playlist">
          <SearchResults
            searchResults={searchResults}
            onAdd={addTrack}
          />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;