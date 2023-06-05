import React, { useEffect, useRef , useState , useContext } from "react";
import axios from "axios";
import { FaRegWindowClose } from "react-icons/fa";
import "./ShowProduct.css";
import MyContext from "../../MyContext";
const ShowProduct = (props) => {
  const infoProductRef = useRef(null);
  const [dataProduct , setDataProduct] = useState([])
  const [nameCategory , setNameCategory] = useState("")
  const [nameSubCategory , setNameSubCategory] = useState("")
  const { order, setOrder } = useContext(MyContext);

  // function to add product to the order
  const handleAddProduct = (id) => {
    setOrder([...order , id])
  }
  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/${props.id}`)
    .then((response) => {
        setDataProduct(response.data)
        setNameCategory(response.data.subCategory[0].category.name)
        setNameSubCategory(response.data.subCategory[0].name);
    })
  }

  useEffect(() => {
    fetchData();
    infoProductRef.current.classList.add("show");
  }, []);
  return (
    <div className="main-showProduct">
      <div className="showProduct-container">
        <div className="showProduct-price">${dataProduct.price}</div>
        <img
          className="image"
          onClick={() => props.remove("", false)}
          src={`${process.env.REACT_APP_API_URL}/${dataProduct.image}`}
          alt="product-img"
        />
        <div className="info-product" ref={infoProductRef}>
          <div>
            <p className="info">{dataProduct.name}</p>
            <p className="info">{nameCategory}</p>
            <p className="info">{nameSubCategory}</p>
            <p className="info">{dataProduct.description}</p>
          </div>
        </div>
        <FaRegWindowClose
          className="close-icon-show-product"
          onClick={() => props.remove("", false)}
        />
        {!props.action && (
          <div
            className="order-show-product"
            onClick={() => handleAddProduct(dataProduct._id)}
          >
            Add +
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowProduct;
