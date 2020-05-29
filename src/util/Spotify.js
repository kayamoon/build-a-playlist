import config from './config';

let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        //sets access token and expires in
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        //if access token and expires_in exist, set them equal to variables
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000); //sets access token to expire at expiration time
            window.history.pushState('Access Token', null, '/'); //clears paramters for the URL, so the app doesn't try getting the token expiration   
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${config.SPOTIFY_CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${config.REDIRECT_URI}`;
            window.location = accessURL; //redirects user to access url
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => { //save search result tracks from GET request
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                    //retrieve information for album cover art image
                }
            });
        });
    },

    savePlaylist(playlistName, trackURIs) { //saves the playlist to the user's Spotify account
        if (!playlistName || !trackURIs.length) { //exit function if no playlistname or track uris
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        let userID;

        return fetch(`https://api.spotify.com/v1/me`, //gets user info from Spotify
            {headers: headers}
            ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, { //POST request to create a new playlist, returns playlist ID
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': `application/json`
                },
                method: 'POST',
                body: JSON.stringify({
                    name: playlistName
                }) //creates new playlist
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                const playlistID = jsonResponse.id; //save playlist ID from POST request
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, { //POST request to add tracks to playlist, returns playlist ID
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': `application/json`
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        uris: trackURIs
                    }) //adds tracks
                });
            });
        });
    }
};

export default Spotify;