import React from 'react';
import './spotify-button.css'

const SpotifyButton = (props) => (
    <div className="SpotifyButton">
        {
        props.accessToken &&
            <button 
                className="SpotifyButton-create btn"
                onClick={props.handleClick}
                >
                Crear la Lista
            </button>
        }
    </div>
)

export default SpotifyButton;