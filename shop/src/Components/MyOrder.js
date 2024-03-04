import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const MyOrders = () => {
    let navigate = useNavigate();
    const [orders, setOrders] = useState([])
    const host = "http://localhost:5000"
    //feth Orders
    const getOrders = async () => {
        const response = await fetch(`${host}/api/order/fetchorders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setOrders(json)

    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getOrders()
        }
        else {
            navigate('/login')
        }

    }, [])
    console.log(orders);

    let totalPrice = orders.reduce((acc, order) => {
        // Sum the total price for each product in the order
        const orderTotal = order.order_data[0].reduce((orderAcc, product) => {
            return orderAcc + product.price * product.qty;
        }, 0);
    
        // Add the order total to the accumulator
        return acc + orderTotal;
       
    }, 0);
   
    

    return (
        <>
            <Navbar props={orders} />

            <div >
                {orders.length === 0 ? <div><hr></hr><h3>No Orders found</h3></div> :
                    <table class="table">

                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">name</th>
                                <th scope="col">quantity</th>
                                <th scope="col">price</th>

                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <React.Fragment key={index}>
                                    {order.order_data[0].map((product, productIndex) => (
                                        <tr key={productIndex}>
                                            <th scope="row">Order #{index + 1}</th>
                                            <td>{product.name}</td>
                                            <td>{product.qty}</td>
                                            <td>{product.price*product.qty}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                            


                        </tbody>
                    
                    </table>
                  
                }
            </div>
            <div className='d-flex justify-content-end mx-5'>
                    <h3>Total Price:{totalPrice}</h3> 
                     </div>
        </>
    )
}

export default MyOrders