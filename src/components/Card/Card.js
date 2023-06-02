import React, { useContext , useState , useEffect} from "react";
import "./Card.css";
import MyContext from "../../MyContext";
import {FaCheck}  from "react-icons/fa";
const Card = (props) => {
  const { order, setOrder , addOrder , removeOrder} = useContext(MyContext);

  // function to add products to the cart


  const handleAddProducts = (element) => {
    if(localStorage.getItem("myArray") !== null){
         if (localStorage.getItem("myArray").includes(element)) {
          // console.log(element);
      removeOrder(element);
      props.Refetch();
    } else {
      addOrder(element)
      props.Refetch()
    }
    }else{
      addOrder(element)
      props.Refetch()
    }
  };

  //function to add the product id to the orders localStorage

  return (
    <div className="card-container">
      <div
        className="hidden-div"
        onClick={() => props.getId(props.id, true)}
      ></div>
      <img
        className="img-product"
        src={`${process.env.REACT_APP_API_URL}/${props.image}`}
        alt="card-product"
      />
      <div className="information-card">
        <p>{props.name}</p>
        <p>{props.type}</p>
        <p>{props.price}$</p>
      </div>
      <div className="button-add" onClick={() => handleAddProducts(props.id)}>
        Add to your favorite{" "}
        {props.status && (
          <span>
            <FaCheck className="check-include-card" />
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
