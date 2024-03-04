import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Login from './Components/Login';


import Signup from './Components/Signup';
import ProductState from './Context/products/ProductState';
import Home from './Screens/Home';
import { CartProvider } from './Context/CartState';
import MyOrders from './Components/MyOrder';


function App() {
  return (
    <div className="App">
      <ProductState> {/* Use the correct imported component name */}
        <CartProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/myorders" element={<MyOrders />} />
            </Routes>
          </Router>
        </CartProvider>
      </ProductState>
    </div>
  );
}

export default App;
