import React from 'react';
import HomeImage from "../../images/ceramic-home-page.jpeg";
import { NavLink } from "react-router-dom";
import "./LandingVideo.css";
const LandingVideo = () => {
  return (
    <div className="landing-video-container">
      <div className="lower-opacitie"></div>
      <div className="info-home">
        <div>  <h2>
          Marble&Ceramic
        </h2>
        <p>
          Artistic Masterpieces of Marble and Ceramic: Explore Our Stunning
          Gallery
        </p></div>
      
        <NavLink to="/documentation" className='home-button'>
         Look the Documentation 
        </NavLink>
      </div>
      <img className="image-home" src={HomeImage} alt="image-home-page"></img>
    </div>
  );
}

export default LandingVideo;
