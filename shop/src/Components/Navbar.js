import 'bootstrap/dist/css/bootstrap.css';

import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';
import { useCart } from '../Context/CartState';
;



const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout =()=>{
    
     localStorage.removeItem('token');
     if(localStorage.removeItem('token')){

      navigate("/");
     }
     
  }
  let data = useCart();
  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-light" style={{backgroundColor:"#e3f2fd"}}>
        <div className="container-fluid">

          <Link className="navbar-brand" to="/">Brands</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/">
                Categories
              </Link>
              {localStorage.getItem('token')? (
                <Link to="/myorders" type="button" className="btn btn-info position-relative mx-5"  >
                MyOrders
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                
                </span>
              </Link>
              ):""}
              
            </div>
            <div className="navbar-nav ml-auto">
             
              <i className=" nav-link fa-solid fa-cart-arrow-down mx-4 mt-2 " type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                <span className="small position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-1 ">
                  {data.length}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </i>
              {!localStorage.getItem('token')?(
                <div>
              <Link className="btn btn-info position-relative " to="/login">
                login
              </Link>
              <Link className="btn btn-info position-relative mx-3" to="/signup">
                Signup
              </Link> </div>
              ): <Link className='btn btn-info position-relative mx-3' onClick={handleLogout}>Log Out</Link>
              }

            </div>
          </div>
        </div>
      </nav>

      <Cart />
     


    </>
  );
};

export default Navbar;
