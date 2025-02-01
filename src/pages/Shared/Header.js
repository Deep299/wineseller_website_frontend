// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; 

const Header = () => {
  const navigate = useNavigate();
  const [hasProductsInCart, setHasProductsInCart] = useState(false);
  const [hasProductsInWishlist, setHasProductsInWishlist] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [WishlistCount, setWishlistCount] = useState(0);

  const checkCartProducts = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    setHasProductsInCart(cartProducts.length > 0);
    setCartCount(cartProducts.length);
  };
  const checkWishlistProducts = () => {
    const WishlistProducts = JSON.parse(localStorage.getItem('wishlistProducts')) || [];
    setHasProductsInWishlist(WishlistProducts.length > 0);
    setWishlistCount(WishlistProducts.length);
  };

  useEffect(() => {
    checkCartProducts();
    checkWishlistProducts();

    const handleStorageChange = () => {
      checkCartProducts();
      checkWishlistProducts();
    };

    window.addEventListener('cartChange', handleStorageChange);
    window.addEventListener('WishlistChange', handleStorageChange);

    return () => {
      window.removeEventListener('cartChange', handleStorageChange);
      window.removeEventListener('WishlistChange', handleStorageChange);
    };
  }, []);

  const handleCartIconClick = (action) => {
    switch (action) {
      case "Cart":
        navigate("/Cart");
        break;
      case "Wishlist":
        navigate("/Wishlist");
        break;
      case "Profile":
        navigate("/Login");
        break;
      default:
        return;
    }
  };

  const iconVariants = {
    hover: { color: '#ff0000' },
  };
  return (
    <header className="home-header">
         <div className="logo">
        <Link to="/">WineCeller</Link>
      </div>
      <nav className="nav-links">
               {['Home', 'Products', 'About', 'Contact'].map((link, index) => (
             <motion.div
             key={index}
             className="nav-link"
             whileHover="hover"
             initial="initial"
             animate="animate"
           >
              <motion.div
              className="link-text"
              variants={{
                initial: { color: '#000' },
                hover: { color: '#ff0000' },
              }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/${link.toLowerCase()}`}>{link}</Link>
              </motion.div>
              <motion.div
              className="underline"
              variants={{
                initial: { width: 0 },
                hover: { width: '100%' },
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          ))}
      </nav>
      <div className="header-icons">
      <motion.i
          onClick={() => handleCartIconClick('Cart')}
          variants={iconVariants}
          whileHover="hover"
          initial="initial"
          transition={{ duration: 0.3 }}
          className={hasProductsInCart ? 'icon active' : 'icon'}
        >
           <FontAwesomeIcon icon={faShoppingCart} />
           {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </motion.i>
        <motion.i
          onClick={() => handleCartIconClick('Wishlist')}
          variants={iconVariants}
          whileHover="hover"
          initial="initial"
          transition={{ duration: 0.3 }}
          className={hasProductsInWishlist ? 'icon active' : 'icon'}
        >
           <FontAwesomeIcon icon={faHeart} />
           {WishlistCount > 0 && <span className="Wishlist-count">{WishlistCount}</span>}
        </motion.i>
          <motion.i
          onClick={() => handleCartIconClick('Profile')}
          variants={iconVariants}
          whileHover="hover"
          initial="initial"
          transition={{ duration: 0.3 }}
        >
          <FontAwesomeIcon icon={faUser} />
        </motion.i>
      </div>
    </header>
  );
};

export default Header;