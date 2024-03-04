import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useCart, useDispatchCart } from '../Context/CartState';


const ProductCard = (props) => {


    let dispatch = useDispatchCart();
    let data = useCart();
    const { product } = props;
    const [qty, setQty] = useState(1);

    const handleAddToCart = async () => {
        await dispatch({ type: "ADD_TO_CART", id: product._id, name: product.name, price: product.Price, qty: qty });
        console.log(data)
    }
 



    return (
        <div className=' col-lg col-xl-3 col-lg-3 col-md-4  mb-4'>

            <div className="card "  >
                <img src={product.img} class="card-img-top" alt="..." style={{ height: "160px" }} />
                <div className="card-body ">
                    <h5 className="card-title">{product.name}</h5>
                    <h5>${product.Price}</h5>
                    <hr></hr>
                    <div className='d-flex justify-content-between align-items-center '>
                        <Link to="/" className="btn btn-danger" onClick={handleAddToCart} >Add to cart</Link>
                        <input type="text" className="form-control w-50 text-center" name='qty' onChange={(e) => setQty(e.target.value)} id="qty" placeholder="1-10" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductCard