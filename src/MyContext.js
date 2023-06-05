import React, { useState, createContext } from "react";

const MyContext = createContext();

export const DataProvider = ({ children }) => {
  const [categoryName, setCategoryName] = useState("All Categories");
  const [order, setOrder] = useState([]);

  
  

  
  


   // function to add product to order
   const addOrder = (element) => {
    const existingData = localStorage.getItem("myArray");
    // console.log(existingData , "existingData");
    const dataArray = existingData ? JSON.parse(existingData) : [];
    // console.log(dataArray, "dataAsetOrderrray");
    dataArray.push(element);
    const updatedData = JSON.stringify(dataArray);
    // console.log(updatedData , "updateData")
    localStorage.setItem("myArray", updatedData);
    // console.log(JSON.parse(localStorage.getItem("myArray")))    
   }

   // function to remove product from order
const removeOrder = (element) => {
  const existingData = localStorage.getItem("myArray");
  const dataArray = existingData ? JSON.parse(existingData) : [];

  // Find the index of the element to remove
  const indexToRemove = dataArray.indexOf(element);

  if (indexToRemove > -1) {
    // Remove the element at the found index
    dataArray.splice(indexToRemove, 1);

    // Update the local storage with the updated array
    const updatedData = JSON.stringify(dataArray);
    localStorage.setItem("myArray", updatedData);
  }
};


  return (
    <MyContext.Provider
      value={{ categoryName, setCategoryName, order, setOrder, addOrder, removeOrder }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
