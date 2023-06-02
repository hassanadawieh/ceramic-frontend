import React, { useState, useEffect, useContext } from "react";
import MyContext from "../../MyContext";
import { FaAngleRight, FaSearch } from "react-icons/fa";
import ShowProduct from "../../components/ShowProduct/ShowProduct";
import axios from "axios";
import Spinner from "../../components/spinner/spinner";
import Card from "../../components/Card/Card";
import "./Product.css";
// import Order from "../Order/Order";
const Product = () => {
  const [totalPages, setTotalPages] = useState([]);
  const [products, setProducts] = useState([]);
  const [numberPages, setNumberPages] = useState([]);
  const [page, setPage] = useState(1);
  const [AllProducts, setAllProducts] = useState([]);
  const [showPagginations, setShowPagginations] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const [showProduct, setShowProduct] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterSearch , setFilterSearch] = useState([]);
  const { order, setOrder } = useContext(MyContext);

  // function to get the idproduct show

  const handleGetIdProduct = (id, status) => {
    setIdProduct(id);
    setShowProduct(status);
  };

  // function to referesh the page
  const handleRefetch = () => {
    setOrder(JSON.parse(localStorage.getItem("myArray")));
  };

  // get the category name from the useContext
  const { categoryName } = useContext(MyContext);

  // function to get the subCategories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let arrauSubCategory = [];
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/subCategory`)
        .then((response) => {
          setIsLoading(false);
          try {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].category.name === categoryName) {
                arrauSubCategory.push(response.data[i]);
              }
            }
          } catch (error) {
            console.log(error.message);
          }
        });
      setSubCategories(arrauSubCategory);
    };
    fetchData();
  }, [categoryName]);
  // function to get the products by category
  useEffect(() => {
    let storProducts = [];
    if (categoryName !== "All Categories") {
      for (let i = 0; i < AllProducts.length; i++) {
        setShowPagginations(false);
        if (AllProducts[i].subCategory[0].category.name === categoryName) {
          storProducts.push(AllProducts[i]);
        }
      }
      setProducts(storProducts);
    } else {
      setShowPagginations(true);
      fetchAllProducts();
    }
  }, [categoryName, AllProducts, page]);

  //function to get the all products
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let arrayAllProducts = [];
      for (let i = 0; i < numberPages.length; i++) {
        try {
          setIsLoading(false);
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/product?page=${numberPages[i]}`
          );
          for (let i = 0; i < response.data.items.length; i++) {
            arrayAllProducts.push(response.data.items[i]);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      setAllProducts(arrayAllProducts);
    };
    fetchData();
  }, [numberPages]);

  // function to get the products baye pages
  const handleGetProductsByPage = (element) => {
    setPage(element);
  };

  // function to get the number pages
  useEffect(() => {
    let numberPages = [];
    for (let i = 0; i < totalPages; i++) {
      numberPages.push(i + 1);
    }
    setNumberPages(numberPages);
  }, [totalPages]);

  const fetchAllProducts = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/product?page=${page}`)
      .then((response) => {
        try {
          setIsLoading(false);
          setProducts(response.data.items);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.log(error.message);
        }
      });
  };

  // function to get the products by subCategory
  const handlefilterBySubCategory = (element) => {
    let arrayProducts = [];
    for (let i = 0; i < AllProducts.length; i++) {
      if (AllProducts[i].subCategory[0].name === element) {
        arrayProducts.push(AllProducts[i]);
      }
    }
    setProducts(arrayProducts);
  };  


  //function to get the product start with the value of search bar
  const handleSearchBar = (element) => {
      let arrayProducts = [];
    for (let i = 0; i < AllProducts.length; i++) {
      if (AllProducts[i].name.startsWith(element)) {
           arrayProducts.push(AllProducts[i]);
      }
    }
    setProducts(arrayProducts);
  }


  useEffect(() => {
    fetchAllProducts();
  }, [page, order, filterSearch]);

  return (
    <div className="product-container">
      {isLoading && <Spinner />}
      {showProduct && (
        <ShowProduct remove={handleGetIdProduct} id={idProduct} />
      )}
      <div className="image-product">
        <div className="space-header">
          <div className="nameCategory">{categoryName}</div>
        </div>
      </div>
      <div className="section-subCategory">
        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="search..."
              className="search-input"
              onChange={(e) => handleSearchBar(e.target.value)}
            ></input>
            <div className="div-search">
              <FaSearch className="search-icon" />
            </div>
          </div>
        </div>
        <div className="subCategories">
          <h4>ALL Type</h4>
          {subCategories.map((element) => (
            <h4
              key={element._id}
              onClick={() => handlefilterBySubCategory(element.name)}
            >
              {element.name}
            </h4>
          ))}
        </div>
      </div>
      <div className="main-product">
        {products.map((element) => (
          <Card
            status={
              JSON.parse(localStorage.getItem("myArray"))?.includes(
                element._id
              ) || false
            }
            key={element._id}
            id={element._id}
            name={element.name}
            type={element.subCategory[0].name}
            price={element.price}
            image={element.image}
            quantity={element.quantity}
            getId={handleGetIdProduct}
            Refetch={handleRefetch}
          />
        ))}
      </div>
      {showPagginations && (
        <div className="section-paggination">
          <div className="paggination">
            {numberPages.map((element) => (
              <div
                key={element}
                onClick={() => handleGetProductsByPage(element)}
              >
                {element}
              </div>
            ))}
          </div>
          {page === totalPages ? (
            ""
          ) : (
            <div
              className="next"
              onClick={() => handleGetProductsByPage(page + 1)}
            >
              {<FaAngleRight className="next-button" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Product;
