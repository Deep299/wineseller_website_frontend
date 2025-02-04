import React from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import ULogin from './pages/ULogin';
import Register from './pages/Register';
import Home from './pages/Home/Home';
import Cart from './pages/Single Pages/Cart'; 
import './App.css';
import Wishlist from './pages/Single Pages/Wishlist'; 
import ProductDetails from './pages/Single Pages/ProductDetails';
import BlankPage from './pages/BlankPage';
import Shipping from './pages/Shipping/Shipping';
import Payment from './pages/Payment/Payment';
import PaymentSuccess from './pages/Payment/PaymentSuccess';

function App() {
  return (
    
        <Router>
            <Routes>
            <Route  path="/Login"  element={<ULogin />} />
            <Route  path="/Register"  element={<Register />} />
            <Route exact  path="/"  element={<Home />} />
            <Route path="/Home"  element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/BlankPage" element={<BlankPage />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
             <Route path="/payment-success" element={<PaymentSuccess />} />
            </Routes>
        </Router>
    );
  
}

export default App;