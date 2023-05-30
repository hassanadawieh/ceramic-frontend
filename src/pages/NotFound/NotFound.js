import React from 'react';
import { useNavigate } from "react-router-dom";
import "./NotFound.css";
 const NotFound = () => {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }
  return (
    <div className="not-found-container">
      <div className='first-div'>
        <span className="a">N</span>
        <span className="b">O</span>
        <span className="a">T</span>
        <span className="b"> </span>
        <span className="a"> </span>
        <span className="b">F</span>
        <span className="a">O</span>
        <span className="b">U</span>
        <span className="a">N</span>
        <span className="b">D</span>
      </div>
      <div className='second-div'>
        <span onClick={goBack}>Go Back</span>
      </div>
    </div>
  );
}

export default NotFound;
