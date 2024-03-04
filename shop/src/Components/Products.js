import React, {useContext, useEffect} from 'react'
import ProductCard from './ProductCard'

import ProductContext from '../Context/products/ProductContext'

const Products = () => {
    const context = useContext(ProductContext);
    const {products, getProducts} = context; 
    useEffect(() => {
      getProducts()
         
    }, [])
    
  return (
    <div className='container mt-5'>
      <div className='row '>
        <h1 className="text-start">Popular Products</h1>
        <hr></hr>
        {products.map((product)=>{
           return  <ProductCard product={product} />
        })}
       
       </div>

    </div>
  )
}

export default Products