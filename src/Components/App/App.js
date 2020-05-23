import React from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

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
      ]
    }
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


