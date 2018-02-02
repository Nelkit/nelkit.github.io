import React from 'react';
import './profile-info.css'

function ProfileInfo(props){
    return(
        <div className="ProfileInfo">
            {
                props.src ?
                    <img src={props.src} height="50" alt="Logo"/>
                :
                    <a 
                        className="ProfileInfo-auth btn" 
                        href={
                            'https://accounts.spotify.com/authorize?client_id='+
                            props.authorizeData.client_id+
                            '&redirect_uri='+
                            props.authorizeData.redirect_uri+
                            '&response_type=token&scope=playlist-modify-public playlist-modify-private'
                        }>
                        Autorizar
                    </a>
            }
        </div>
    )
}

export default ProfileInfo; 