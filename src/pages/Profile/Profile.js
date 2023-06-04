import React, { useState, useEffect } from "react";
import "./Profile.css";
import Cookies from "js-cookie";
import axios from "axios";

const Profile = () => {
  const [infoUser, setInfoUser] = useState([]);
  const [logoProfile, setLogoProfile] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [allOrders , setAllOrders] = useState([]);
  const [userOrders , setUserOrders] = useState([]);
  const [numberOrders , setNumberOrders] = useState([]);
  const [effectNumber , setEffectNumber] = useState(1);
  const [products , setProducts] = useState([]);
  const [open , setOpen] = useState(false);
  // function to fetch get the info user
  const fetchDataUser = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/user/${Cookies.get("user-id")}`
      )
      .then((response) => {
        try {
          setInfoUser(response.data.user);
          setLogoProfile(response.data.user.fullName.charAt(0));
        } catch (error) {
          console.log(error.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // function to get the totalPages
  const getAllOrderUser = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/order`).then((response) => {
      try {
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error.message);
      }
    });
  };

  // function to get the all orders
const getAllOrders = async() => {
  let array = [];
  let requests = [];

  for (let i = 1; i <= totalPages; i++) {
    const request = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/order?page=${i}`
    );
    requests.push(request);
  }

  Promise.all(requests)
    .then((responses) => {
      responses.forEach((response) => {
        try {
          array.push(response.data.items);
        } catch (error) {
          console.log(error.message);
        }
      });

      setAllOrders(array);
    })
    .catch((error) => {
      console.log(error);
    });
};
//function to get the order for the user
const getFavoriteProduct =() => {
    let array=[];
    for(let i = 0 ; i < allOrders.length ; i++){
        for(let j = 0 ; j < allOrders[i].length ; j++){
            if(allOrders[i][j].user[0]._id === Cookies.get("user-id")){
                array.push(allOrders[i][j])
            }
        }
        }
    setUserOrders(array);
    
    }

    // function to get the number the orders of the user
    const numberOrder = () => {
      const array=[];
        for(let i = 1 ; i <= userOrders.length ; i++){
            array.push(i);
        }
        setNumberOrders(array)
        setOpen(true);
    }



    // function to store the data of the product for a specific order
const handleStoreProductsData = (element) => {
    setProducts(userOrders[element-1].products);
};

  useEffect(() => {
    numberOrder();
  },[userOrders])
  useEffect(() => {
getFavoriteProduct()
  },[allOrders]);
  useEffect(() => {
    getAllOrders();
  }, [totalPages]);
  useEffect(() => {
    getAllOrderUser();
  }, [infoUser]);
  useEffect(() => {
    fetchDataUser();
  }, []);

  return (
    <div className="profile-container">
      <div className="hero-section-profile"></div>
      <div className="profile-content">
        <div className="info-profile">
          <h2 className="name-user">{infoUser.fullName}</h2>
          <div className="image-profile">
            <strong>{logoProfile}</strong>
          </div>
          <p>{infoUser.email}</p>
          <p>{infoUser.address}</p>
          <p>{infoUser.phoneNumber}</p>
        </div>
        <div className="favorite-data">
          <div className="hero-favorite-data">
            <strong>your Favorites</strong>
            <div>{effectNumber}</div>
          </div>
          <div className="number-favorite">
            {numberOrders ? (
              numberOrders.map((element) => (
                <span
                  key={element}
                  onClick={() => {
                    setEffectNumber(element);
                    handleStoreProductsData(element);
                  }}
                >
                  choise {element}
                </span>
              ))
            ) : (
              <span>no orders</span>
            )}
          </div>
          <div className="favorite-products">
            {products.map((element) => (
              <div className="card-product" key={element._id}>
                <h3>{element.name}</h3>
                <p>{element.price}$</p>
                <p>{element.subCategory[0].name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
