import React, { useState } from "react";
import ProductContext from "./ProductContext";

const ProductState = (props) => {
  const productsInitial = [];
  const [products, setProducts] = useState([])
  const [productCategory, setProductCategory] = useState([])
  const host = "http://localhost:5000"

  //feth all products
  const getProducts = async() =>{
   const response = await fetch(`${host}/api/products/fetchproducts`,{
   method:"GET",
   headers: {
    "Content-Type": "application/json"
   }
   });
   const json = await response.json()
   
   setProducts(json[0])
   setProductCategory(json[1])
  }
       

    return(
          
    <ProductContext.Provider value={{products, getProducts, productCategory}}  >
        {props.children}
    </ProductContext.Provider>

   
)
}

export default ProductState;