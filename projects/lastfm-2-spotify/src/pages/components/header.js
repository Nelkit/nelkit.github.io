import React from 'react';
import './header.css'
import logo from '../../../images/logo.png';

function Header(props){
    return(
        <div className="Header">
            <img src={logo} height="70" alt="Logo"/>
            {props.children}
        </div>
    )
}

export default Header; 