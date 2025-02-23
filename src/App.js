import {Suspense, lazy} from "react";
import ScrollToTop from "./helpers/scroll-top";
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
import PricingBifurcation from './pages/Payment/PricingBifurcation';
import PaymentSuccess from './pages/Payment/PaymentSuccess';

const HomeNew = lazy(() => import("./NewPages/Home/Home"));

function App() {
  return (
    
        <Router>
             <ScrollToTop>
             <Suspense
            fallback={
              <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
             <Routes>
             <Route exact  path="/"  element={<HomeNew />} />
             <Route path="/Home"  element={<HomeNew />} />
             </Routes>
             </Suspense>
             </ScrollToTop>
            <Routes>
            <Route  path="/Login-old"  element={<ULogin />} />
            <Route  path="/Register-old"  element={<Register />} />
            <Route path="/Home-old"  element={<Home />} />
            <Route path="/Cart-old" element={<Cart />} />
            <Route path="/Wishlist-old" element={<Wishlist />} />
            <Route path="/product-old/:productId" element={<ProductDetails />} />
            <Route path="/BlankPage-old" element={<BlankPage />} />
            <Route path="/shipping-old" element={<Shipping />} />
            <Route path="/payment-old" element={<Payment />} />
            <Route path="/pricing-bifurcation-old" element={<PricingBifurcation />} />
             <Route path="/payment-success-old" element={<PaymentSuccess />} />
            </Routes>
            
        </Router>
    );
  
}

export default App;