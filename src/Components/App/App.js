import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

function App() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        Add a SearchBar component
        <div className="App-playlist">
        Add a SearchResults component
        Add a Playlist component
        </div>
      </div>
    </div>
  );
}

export default App;


