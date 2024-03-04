import React from 'react'
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Products from '../Components/Products';
import CatProducts from '../Components/CatProducts';
const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <CatProducts />
        <Products />
        
    </div>
        
  )
}

export default Home