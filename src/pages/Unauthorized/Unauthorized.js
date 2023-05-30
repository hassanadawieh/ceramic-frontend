import React from 'react';
import { useNavigate } from "react-router-dom";
import "./Unauthorized.css";
 const Unauthorized = () => {
   const navigate = useNavigate();

   const goBack = () => {
     navigate(-1);
   };
   return (
     <div className="unauthorized-container">
       <div className="first-div">
         <span className="a">U</span>
         <span className="b">N</span>
         <span className="a">A</span>
         <span className="b">U</span>
         <span className="a">T</span>
         <span className="b">H</span>
         <span className="a">O</span>
         <span className="b">R</span>
         <span className="a">I</span>
         <span className="b">Z</span>
         <span className="b">E</span>
         <span className="b">D</span>
       </div>
       <div className="second-div">
         <span onClick={goBack}>Go Back</span>
       </div>
     </div>
   );
 }

export default Unauthorized;