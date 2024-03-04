import React from 'react';
import bigShoe1 from '../assets/images/big-shoe1.png';

const Hero = () => {
    return (
        <>
            <div className='container  '>
                <div className='row'>
                    <div className='col-md-6'>
                        <h6 className='mb-5 mt-4 text-danger'>Our Winter Collection</h6>
                        <div>
                        <p className=' display-2 fw-bold  '> The New Arrival   <span className='display-2 fw-bold text-danger'>Branded </span>   Shoes</p> 
                        </div>
                        
                        <p className='text-secondary  '>Discover Stylish New Arrival quality comfort and innovation for your active life</p>
                        <div className='d-flex justify-content-start'>
                        <button type="button" className="btn btn-danger rounded mt-5 ">Shop Now</button>
                        </div>
                    </div>
                    <div className='col-md-6 '>
                        <img src={bigShoe1} className="w-100 h-100" alt="" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Hero