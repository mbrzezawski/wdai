import React from'react'
import panda3 from './images/panda3.jpg'
import './hello.css'

const Hello  = () => {
    return(
        <div className="hello-container">
            <div className = "hello-content">
                <img src={panda3}
                alt="szefo"
                className="hello-image"
                />
            </div>
        </div>
    );
};
export default Hello;