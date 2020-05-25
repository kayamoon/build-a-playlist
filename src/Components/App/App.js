import React from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        searchResults: [
        {
          name: 'All I Do',
          artist: 'Stevie Wonder',
          album: 'Songs in the Key of Life',
          id: 1
        },
        {
          name: 'The Bird',
          artist: 'Anderson Paak',
          album: 'Malibu',
          id: 2
        },
        {
          name: 'Brooklyn',
          artist: 'Mos Def',
          album: 'Black on Both Sides',
          id: 3
        }
      ],
      playlistName: 'Summer 2015',
      playlistTracks: [
        {
          name: 'Sweet Life',
          artist: 'Frank Ocean',
          album: 'Channel Orange',
          id: 5
        },
        {
          name: 'Cocoa Butter Kisses',
          artist: 'Chance The Rapper',
          album: 'Acid Rap',
          id: 4
        }
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
        return;
    } 
    else {
      tracks.push(track);

      this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name){
    this.setState({ playlistName: name });
  }
  
  savePlaylist(){
    let trackURIs = [];
    let tracks = this.state.playlistTracks;
    return tracks.map(track => {
      return trackURIs.push(`spotify:track:${track.id}`);
    })
    //console.log(trackURIs);
    //console.log(this.state.playlistName);
  }

  searchSpotify(term){
    if(term !== ''){
        Spotify.search(term).then(tracks => {
        this.setState({ searchResults: tracks });
    })
    }
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.searchSpotify}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
              onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;


