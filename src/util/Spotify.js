import config from './config';

let accessToken;

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }

        //sets access token and expires in
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        //if access token and expires_in exist, set them equal to variables
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000); //sets access token to expire at expiration time
            window.history.pushState('Access Token', null, '/'); //clears paramters for the URL, so the app doesn't try getting the token expiration   
            return accessToken; 
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${config.SPOTIFY_API_KEY}&response_type=token&scope=playlist-modify-public&redirect_uri=${config.REDIRECT_URI}`;
            window.location = accessURL; //redirects user to access url
        }
    },

    async search(term){
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${config.SPOTIFY_API_KEY}`
            }
        });
        const jsonResponse = await response.json();
        if (jsonResponse.tracks) {
            return jsonResponse.tracks.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                };
            });
        }
    }
}

export default Spotify;