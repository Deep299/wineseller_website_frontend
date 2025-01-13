import React from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import ULogin from './pages/ULogin';
import Home from './pages/Home/Home';
import Cart from './pages/Single Pages/Cart'; 
import './App.css';
import Wishlist from './pages/Single Pages/Wishlist'; 
import ProductDetails from './pages/Single Pages/ProductDetails';
import BlankPage from './pages/BlankPage';

function App() {
  return (
    
        <Router>
            <Routes>
            <Route  path="/Login"  element={<ULogin />} />
            <Route exact  path="/"  element={<Home />} />
            <Route path="/Home"  element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/BlankPage" element={<BlankPage />} />
            </Routes>
        </Router>
    );
  
}

export default App;