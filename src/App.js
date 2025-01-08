import React from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import ULogin from './pages/ULogin';
import Home from './pages/Home/Home';
import Cart from './pages/Single Pages/Cart'; 
import './App.css';
import Wishlist from './pages/Single Pages/Wishlist'; 
import ProductDetails from './pages/Single Pages/ProductDetails';

function App() {
  return (
    
        <Router>
            <Routes>
            <Route exact  path="/"  element={<ULogin />} />
            <Route path="/Home"  element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            </Routes>
        </Router>
    );
  
}

export default App;