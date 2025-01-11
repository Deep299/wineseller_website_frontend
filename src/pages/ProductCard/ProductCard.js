import React, { useState, useEffect }  from "react";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import ProductService from '../../Services/ProductService';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const navigate = useNavigate();
  const firstInventory = product.inventories.find(
    (inventory) => inventory.available
  );
  useEffect(() => {
    const storedCartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    setCartProducts(storedCartProducts);
    const storedWishlistProducts = JSON.parse(localStorage.getItem('wishlistProducts')) || [];
    setWishlistProducts(storedWishlistProducts);
  }, []);
  const handleCartAction = (action,quantity = 1) => {
    let updatedCartProducts;

    switch (action) {
      case 'add':
        ProductService.handleAddToCart(product, firstInventory);
        updatedCartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        break;
      case 'change':
        updatedCartProducts = ProductService.handleChangeQuantity(firstInventory.SKU, quantity);
        break;
      default:
        return;
    }

    setCartProducts(updatedCartProducts);
  };

  const handleAddToWishlist = () => {
    ProductService.handleAddToWishlist(product, firstInventory);
    const updatedWishlistProducts = JSON.parse(localStorage.getItem('wishlistProducts')) || [];
    setWishlistProducts(updatedWishlistProducts);
  };
  const handleProductClick = () => {
    navigate(`/product/${product.ProductId}`);
  };
  const existingProduct = cartProducts.find(cartProduct => cartProduct.SKU === firstInventory?.SKU);
  const isInWishlist = wishlistProducts.some(wishlistProduct => wishlistProduct.SKU === firstInventory?.SKU);
  return (
    <div className="product-card" onClick={handleProductClick}>
      <h2>{product.name}</h2>
      <img src={product.img} alt={product.name} className="product-image" />
      {firstInventory ? (
        <>
          <p>Price: ${firstInventory.price}</p>
          <p>Size: {firstInventory.size}</p>
          <div className="product-actions">
          {existingProduct ? (
              <div className="quantity-controls">
                <button className="quantity-button" onClick={(e) =>{e.stopPropagation();  handleCartAction('change', existingProduct.quantity - 1)}}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="quantity">{existingProduct.quantity}</span>
                <button className="quantity-button" onClick={(e) =>{e.stopPropagation();  handleCartAction('change', existingProduct.quantity + 1)}}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            ) : (
              <button className="action-button" onClick={(e) =>{e.stopPropagation(); handleCartAction('add')}}>
                <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
              </button>
            )}
            <button className={`action-button ${isInWishlist ? 'in-wishlist' : ''}`} onClick={(e) => {e.stopPropagation(); handleAddToWishlist()}}>
              <FontAwesomeIcon icon={faHeart} /> {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </>
      ) : (
        <p>Out of stock</p>
      )}
    </div>
  );
};

export default ProductCard;
