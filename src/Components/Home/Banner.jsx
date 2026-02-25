import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../images/banner.webp';
import banner_mobile from '../images/banner_mobile.webp';

const Banner = () => {
  return (
    <div className="header">
      <div className="banner_mobile">
        <img src={banner_mobile} alt="" />
      </div>
      <div className="banner_desktop">
        <img src={banner} alt="" />
      </div>
    </div>
  );
};

export default Banner;