import React from "react";
import SpinnerImage from "../../../src/images/spinner2.svg"
import "./spinner.css";

function Spinner() {
  return (
  
  <div className="spinner-container">
    <img className="loader" src={SpinnerImage}></img>
  </div>
  )
}

export default Spinner;
