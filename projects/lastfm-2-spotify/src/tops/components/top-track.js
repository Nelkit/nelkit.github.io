import React, { Component } from 'react';
import Track from './track.js';
import './top-track.css';

const TopTrack = (props) => (
    <div className="TopTrack">
        {
            props.tracks &&
            props.tracks.map((item)=>{
                return (
                    <Track 
                        name={item.name} 
                        artist={item.artist.name} 
                        image={item.image[0]['#text']} 
                        playcount={item.playcount}
                        key={item.name} />
                )
            })
        }
    </div>
)

export default TopTrack;