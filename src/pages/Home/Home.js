import  './Home.css';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import ProductService from '../../Services/ProductService';

const Home = () => {
  console.log(1);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await ProductService.getProducts();
      setProducts(products);
      if (products.length > 0) {
        setSelectedCategory(products[0].category); 
      }
    };

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(product => product.category))];

  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory(category);
  }, []);
  const handleCartIconClick = (action) => {
    switch (action) {
      case "Cart":
        navigate("/Cart");
        break;
      case "Wishlist":
        navigate("/Wishlist");
        break;
      default:
        return;
    }
  };
  return (
    <div>
       <header className="header-icons">
        <i className="fas fa-shopping-cart" onClick={() => handleCartIconClick('Cart')}></i>
        <i className="fas fa-heart" onClick={() => handleCartIconClick('Wishlist')}></i>
      </header>
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="product-list">
        {products
          .filter(product => product.category === selectedCategory)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Home;