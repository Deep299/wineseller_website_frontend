// src/components/Banner.js
import React from 'react';
import './Banner.css'; 

const images = {
    src: require('../../assets/BannerImg/Image1.jpg'),
    text: 'Join our wine club for special offers and events.',
  };

const Banner = () => {
  /*   const [currentImageIndex, setCurrentImageIndex] = useState(0); */

 /*  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []); */

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${images.src})` }}
    >
    <div className="banner-text">
    <h1>Welcome to WineCeller</h1>
    <p>{images.text}</p>
      </div>
    </div>
  );
};

export default Banner;