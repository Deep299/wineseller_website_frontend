// FILE: pages/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products.find(p => p.id === productId);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.img} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Size: {product.size}</p>
    </div>
  );
};

export default ProductDetails;