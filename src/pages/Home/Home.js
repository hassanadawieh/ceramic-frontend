import React from 'react';
import LandingVideo from "../../components/LandingVideo/LandingVideo";  
import Spinner from "../../../src/components/spinner/spinner";
import Carosel from "../../components/Carosel/Carosel";
import AboutUs from "../../components/AboutUs/AboutUs"
import "./Home.css";
 const Home = () => {
  return (
    <div className='Home-container'>
      <LandingVideo />
      <AboutUs />
      <Carosel />
    </div>
  )
}

export default Home;
