import  './Home.css';
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Shared/Header';
import ProductCard from '../ProductCard/ProductCard';
import ProductService from '../../Services/ProductService';
import Banner from './Banner ';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
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
  return (
    <div>
      <Header />
      <Banner />
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