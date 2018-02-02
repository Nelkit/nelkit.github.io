import React from 'react';
import './home-layout.css'

function HomeLayout(props){
    return(
        <div className="HomeLayout">
            {props.children}
        </div>
    )
}

export default HomeLayout; 