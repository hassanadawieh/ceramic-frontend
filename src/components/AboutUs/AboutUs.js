import React from 'react';
import logo from "../../images/logo.svg"
import "./AboutUs.css";
 const AboutUs = () => {
  return (
    <div className="About-us-container">
      <div className="About-us-title">About Us</div>
      <div className="logo-info">
        <img src={logo} alt="logo" className="logo-about" />
        <p>
          Welcome to our ceramic and marble gallery! We take pride in offering
          superior products since 2011, specializing in marble. Our extensive
          range of services is unmatched, and we are pleased to announce
          exciting discounts and promotions this weekend. Hurry, as we have
          limited stock available!
        </p>
      </div>
    </div>
  );
}

export default AboutUs;