// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css'; 

const Header = () => {
  const navigate = useNavigate();

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
          className="fas fa-shopping-cart"
          onClick={() => handleCartIconClick('Cart')}
          variants={iconVariants}
          whileHover="hover"
          initial="initial"
          transition={{ duration: 0.3 }}
        ></motion.i>
        <motion.i
          className="fas fa-heart"
          onClick={() => handleCartIconClick('Wishlist')}
          variants={iconVariants}
          whileHover="hover"
          initial="initial"
          transition={{ duration: 0.3 }}
        ></motion.i>
      </div>
    </header>
  );
};

export default Header;