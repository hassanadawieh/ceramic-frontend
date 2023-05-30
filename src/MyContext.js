import React, { useState, createContext } from "react";

const MyContext = createContext();

export const DataProvider = ({ children }) => {
  const [categoryName, setCategoryName] = useState("All Categories");
  const [order, setOrder] = useState([]);

  
  
  
  
  


   // function to add product to order
   const addOrder = (element) => {
    const existingData = localStorage.getItem("myArray");
    console.log(existingData , "existingData");
    const dataArray = existingData ? JSON.parse(existingData) : [];
    console.log(dataArray, "dataAsetOrderrray");
    dataArray.push(element);
    const updatedData = JSON.stringify(dataArray);
    console.log(updatedData , "updateData")
    localStorage.setItem("myArray", updatedData);
    console.log(JSON.parse(localStorage.getItem("myArray")))    
   }
  return (
    <MyContext.Provider
      value={{ categoryName, setCategoryName, order, setOrder, addOrder }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
