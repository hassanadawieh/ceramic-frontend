import React , {useState , useEffect} from 'react';
import Spinner from "../../../src/components/spinner/spinner";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import "./Carosel.css";
 const Carosel = () => {
    const [allProducts , setAllProducts] = useState([]);
    const [products , setProducts] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const dataFetch = () => {
         setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/api/product`)
        .then((response) => {
         setAllProducts(response.data.items);
         setIsLoading(false);
        })
    }
    
    useEffect(() => {
     const   array=[];
     for(let i = allProducts.length-3; i < allProducts.length ; i++) {
        array.push(allProducts[i]);    
     }
     setProducts(array);
    }, [allProducts])
    useEffect(() => {
     dataFetch();
    },[]);

  return (
    <div className="main-slider">
      {isLoading && <Spinner />}
      <div className="slider">
        {allProducts.map((element, index) => (
          <span key={element._id} style={{ "--i": index + 1 }}>
            <img
              key={element._id}
              src={`${process.env.REACT_APP_API_URL}/${element.image}`}
              alt="image"
            />
          </span>
        ))}
      </div>
      <NavLink to="/products" className='show-products'>View now</NavLink>
    </div>
  );
}

export default Carosel;
