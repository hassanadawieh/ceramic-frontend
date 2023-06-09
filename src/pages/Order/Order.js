import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import ShowProduct from "../../components/ShowProduct/ShowProduct";
import Spinner from "../../components/spinner/spinner";
import { NavLink } from "react-router-dom";
import { FaRegWindowClose, FaTrashAlt, FaRegEye } from "react-icons/fa";
import "./Order.css";
import MyContext from "../../MyContext";
const Order = () => {
  const [products, setProducts] = useState([]);
  const { order, setOrder } = useContext(MyContext);
  const [showProduct, setShowProduct] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [isLoged, setIsLoged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [changeOrder , setChangeOrder] = useState(false)

  //function to get the id in the idProduct state
  const handleGetIdProduct = (element) => {
    setIdProduct(element);
    setShowProduct(true);
  };
  const handleShowProductHidden = (b, element) => {
    setShowProduct(false);
  };
  // function to fetch and get the products by id
  const getProductsById = async () => {
    setIsLoading(true);
    const arrayProducts = [];
    if(order){
      for (let i = 0; i < order.length; i++) {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/api/product/${order[i]}`)
          .then((response) => {
            arrayProducts.push(response.data);
          });
      }
    }
    setIsLoading(false);
    setProducts(arrayProducts);

  };

  // function to check if the user loged or no
  const idUser = Cookies.get("user-id");
  const handleCheckIfLogedin = () => {
    // setIsLoading(true);

      if (idUser) {
        addOrder();
        setIsLoged(true)
      } else {
        setIsLoged(false);
    }
  };

  // function to add order
  const addOrder = async () => {
    setIsLoading(true);
    try {
      const user = idUser;
      const products = order;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/order`,
        { user, products },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("user-token")}`,
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        window.alert("your order match successfuly");
        localStorage.removeItem("myArray");
        setIsLoading(false);
      }
      Cookies.remove("orders");
    } catch (error) {
      console.error(error.message);
    }
    getProductsById();
    window.location.reload();
  };

  // function to remove the product that I don't need from the order
  const handleRemove = (id) => {
    setIsLoading(true);
    const array = order;
    for (let i = 0; i < order.length; i++) {
      if (order[i] === id) {
        array.splice(i, 1);
      }
    }
    console.log(array);
    setOrder(array);
    getProductsById();
    setIsLoading(false);
  };
  useEffect(() => {
    getProductsById();
  }, [localStorage.getItem("myArray")]);

useEffect(() => {
  setOrder(JSON.parse(localStorage.getItem("myArray")));
}, [changeOrder]);

useEffect(() => {
 if(Cookies.get("user-id")){
  setIsLoged(true);
 } 
})
  return (
    <div className="order-container">
      {isLoading && <Spinner />}
      {showProduct && (
        <ShowProduct
          id={idProduct}
          remove={handleShowProductHidden}
          action={true}
        />
      )}
      <div className="list-order">
        {products.map((element) => (
          <div className="cards" key={element._id}>
            <div className="card-order">
              <img
                className="image-order"
                src={`${process.env.REACT_APP_API_URL}/${element.image}`}
                alt="img-product"
              />
              <div className="info-order">
                <div className="name-product"> {element.name}</div>
                <div className="price">{element.price} $</div>
              </div>
              <div className="action-button">
                <FaRegEye
                  className="order-icon"
                  onClick={() => handleGetIdProduct(element._id)}
                />
                <FaTrashAlt
                  className="order-icon"
                  onClick={() => handleRemove(element._id)}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="confirme-div">
          {!isLoged ? (
            <NavLink className="confirme" to="/login" href="#hero">
              <p>login first</p>
            </NavLink>
          ) : (
            <div className="confirme" onClick={handleCheckIfLogedin}>
              Save
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
