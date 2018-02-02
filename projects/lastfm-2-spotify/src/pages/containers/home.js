import React, { Component } from 'react';
import TopTrack from '../../tops/components/top-track'
import SpotifyButton from '../../widget/components/spotify-button'
import axios from 'axios';
import * as qs from 'query-string';
import HomeLayout from '../components/home-layout';
import Body from '../components/body';
import Header from '../components/header';
import ProfileInfo from '../../users/components/profile-info'

const spotifyAPI = "https://api.spotify.com/v1/"
const clientId = "07096ffae8b546a8afa0d928c84e81f6"
const redirectUri = "http://localhost:9000/?"
var countRequestSearch = 0

class Home extends Component{
    state = {
       data:[],
       uris:[],
       accessToken:'',
       spotifyUser: null,
       authorizeData: {
            client_id: clientId,
            redirect_uri: redirectUri
       }
    }

    componentDidMount() {
        axios.get('http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=nelkit792&period=1month&limit=25&api_key=d7d353832e2216985a326feb76167a71&format=json')
        .then(res => {
            this.setState({
                data:res.data.toptracks.track
            })
            const urlParams = qs.parse(location.hash);
            this.setState({
                accessToken:urlParams.access_token
            })
            this.getInfoUserSpotify();
        });
    }

    getInfoUserSpotify = () => {
        if (this.state.accessToken==null)
            return
        
        axios.get(spotifyAPI+'me?access_token='+this.state.accessToken)
        .then(res => {  
            this.setState({
                spotifyUser: res.data
            })
            console.log(this.state)
        });
    }

    handleCreatePlaylist = () => {
        if (this.state.accessToken==null)
            return
        const config = { 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ this.state.accessToken 
            } 
        };
        axios.post(
            spotifyAPI+'users/'+this.state.spotifyUser.id+'/playlists', 
            {
                name: 'Los 25 más reproducidos'
            },
            config
        )
        .then(res => { 
            this.getUrisTracks(res.data.id);
        })
    }

    getUrisTracks = (playlistId) => {
        if (this.state.accessToken==null)
            return

        this.state.data.map((item)=>{
            axios.get(
                spotifyAPI+
                'search?access_token='+this.state.accessToken+
                '&q='+item.name+'+'+item.artist.name+
                '&type=track'
            )
            .then(res => {  
                countRequestSearch++;
                try{
                    this.state.uris.splice(item['@attr'].rank-1,0,res.data.tracks.items[0].uri)
                    if(countRequestSearch==25)
                        this.addTrackToPlaylist(playlistId)
                }catch(err) {
                    console.log('Cancion No Encontrada')
                }
                
            })
            .catch(error => { 
               countRequestSearch++;
            });
        })
    }

    addTrackToPlaylist = (playlistId) => {
        if (this.state.accessToken==null)
            return
        const config = { 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ this.state.accessToken 
            } 
        };
        axios.post(
            spotifyAPI+'users/'+this.state.spotifyUser.id+'/playlists/'+playlistId+'/tracks', 
            {
                uris: this.state.uris
            },
            config
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        return(
            <HomeLayout >
                <Header>
                    <ProfileInfo 
                        src={this.state.spotifyUser!=null ? this.state.spotifyUser.images[0].url : '' }
                        authorizeData = {this.state.authorizeData}
                        />
                </Header>
                <Body>
                    <TopTrack 
                        tracks={this.state.data} 
                    />
                    <SpotifyButton
                        accessToken = {this.state.accessToken}
                        handleClick = {this.handleCreatePlaylist}
                    />
                </Body>
            </HomeLayout>
        )
    }
}

export default Home;