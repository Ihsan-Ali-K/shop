import React from 'react'
import { useCart, useDispatchCart } from '../Context/CartState'


const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();
  let totalPrice = data.reduce((acc, product) => acc + product.price * product.qty, 0);



  const handleCheckOut = async () => {
    const authToken = localStorage.getItem('token');
    console.log("Token:", authToken);
    const response = await fetch("http://localhost:5000/api/order/addorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ orderData:data, totalPrice: totalPrice })
    });
    const json = await response.json()
    console.log("orderresponse:",json)
    if(response.status===200){
      dispatch({type:"DROP"})
    }
    
    // if (json.success) {
    //   localStorage.setItem('token', json.authtoken)
    //   navigate("/");
      
    // }
  }



  return (
    <div><div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="staticBackdropLabel">Your Cart</h5>

        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      {data.length === 0 ? <div><hr></hr><h3>Cart is empty</h3></div> :
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
            {data.map((product, index) => (

              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.qty}</td>
                <td>{product.price}</td>
                <td><i className="fa-solid fa-trash cursor-pointer" style={{ cursor: "pointer" }} alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }}></i></td>


              </tr>


            ),


            )}
            <tr>
              Total:{totalPrice}
            </tr>



          </tbody>

          
        </table>
      }
  {localStorage.getItem("token")?(<div className='d-flex flex-column align-items-start'>

<button type="button" className="btn btn-danger rounded mt-5 " onClick={handleCheckOut} >Check Out</button>
</div> ): <div>
  <hr></hr>
  <h2>Please login</h2></div>}
    </div>
  
    </div>
  )
}

export default Cart