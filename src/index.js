import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/scss/style.scss";
import "./i18n";
import 'animate.css';
import 'swiper/css/bundle';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { store } from "./store/store";
import { setProducts } from "./store/slices/product-slice";
//import products from "./data/products.json";
import { Provider } from 'react-redux';

const fetchProducts = async () => {
  try {
    const response = await fetch('http://16.171.114.118/api/product/get');
    const products = await response.json();
    store.dispatch(setProducts(products));
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
};

fetchProducts();

//store.dispatch(setProducts());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);
reportWebVitals();
