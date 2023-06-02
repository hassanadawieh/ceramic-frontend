import React, { useState , useEffect} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Brand from "../../images/brand.svg";
import Logo from "../../images/logo.svg";
import {
  FaInstagramSquare,
  FaTwitter,
  FaWhatsappSquare,
  FaFacebookSquare,
} from "react-icons/fa";
import "./Footer.css";
const Footer = () => {
  const [categories, setCategories] = useState([]);

  // function get the categories and store inside the categoriees state
  const fetchCategories = ()=> {axios
    .get(`${process.env.REACT_APP_API_URL}/api/category`)
    .then((response) => {
      try {
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    });
}

  useEffect(() => {
    fetchCategories()
  },[]);
  return (
    <div className="footer-container">
      <div className="main-footer">
        <div className="logo-brand">
          <img className="logo" src={Logo} alt="logo" />
          <img className="brand" src={Brand} alt="brand" />
        </div>
        <div className="footer-information">
          <div className="social-media-container">
            <h3>Social-media</h3>
            <div className="social-media">
              <div>
                <FaFacebookSquare className="icon-social-media" />
                <span>Facebook</span>
              </div>
              <div>
                <FaInstagramSquare className="icon-social-media" />
                <span>Instagram</span>
              </div>
              <div>
                <FaTwitter className="icon-social-media" />
                <span>Twitter</span>
              </div>
              <div>
                <FaWhatsappSquare className="icon-social-media" />
                <span>Whatsapp</span>
              </div>
            </div>
          </div>
          <div className="pages-container">
            <h3>Pages</h3>
            <div className="pages">
              <NavLink className="link link-footer" to="/">
                Home
              </NavLink>
              <NavLink className="link link-footer" to="/products">
                Products
              </NavLink>
              <NavLink className="link link-footer" to="/contact">
                Contact
              </NavLink>
            </div>
          </div>
          <div className="categories-container">
            <h3>Categories</h3>
            <div className="categories">
              {categories.map((element) => (
                <h4 key={element._id}>{element.name}</h4>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="create">&copy;hassan-adawieh</div>
    </div>
  );
};

export default Footer;
