import React from 'react';
import './track.css'
import defaultImage from '../../../images/default.png'

const Track = (props) => (
    <div className="Track">
        <section className="Track-count">{props.playcount}</section>
        <section className="Track-name">
            <img 
                src={props.image ? props.image : defaultImage}
                className="Track-image"
            />
            <div>
                {props.name}
                <small className="Track-artist">{props.artist}</small>
            </div>
        </section>
        
    </div>
)

export default Track;