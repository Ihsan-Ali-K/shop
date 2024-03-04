import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductContext from '../Context/products/ProductContext'
import ProductCard from './ProductCard';


const CatProducts = () => {

    // Step 1: Create state to store the active category
 
  const  [activeCategory, setActiveCategory] = useState('Men');
    
      
    const context = useContext(ProductContext);
    const { products, getProducts } = context;
    useEffect(() => {
        getProducts()

    }, [])
      // Step 3: Filter products based on the active category
           
      

    return (
        <div className='container mt-5'>
            <h1 className='text-start'>Categories</h1>
            <hr></hr>
            <div className='mb-2'>
                <ul className="nav nav-tabs ">
                    <li className="nav-item ">
                        {/*  Update the active category when a link is clicked */}
                        <Link
                            className={`nav-link ${activeCategory === 'Men' ? 'active ' : ''}`} 
                            onClick={() => setActiveCategory('Men')}
                        >
                            Men
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${activeCategory === 'Women' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('Women')}
                        >
                            Women
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link
                            className={`nav-link ${activeCategory === 'Kids' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('Kids')}
                        >
                            Kids
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='row '>
                {  
                
                products.filter((product) => product.CategoryName === activeCategory).map(filterItems=>{
                                      
                    return <ProductCard product={filterItems} />
                })
                }

            </div>



        </div>
    )
}

export default CatProducts