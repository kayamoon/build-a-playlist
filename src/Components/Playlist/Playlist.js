import React from 'react';
import './Playlist.css';
import '../Tracklist/Tracklist';

class Playlist extends React.Component {
    render() {
        return(
            <div className="Playlist">
                <input defaultValue={'New Playlist'}/>
                <button class="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;