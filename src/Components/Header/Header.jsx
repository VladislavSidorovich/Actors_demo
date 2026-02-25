import React from 'react';
import './Header.css'; // CSS файл для стилей
import { Link } from 'react-router-dom';
import logo from '../images/logo.webp';

const Header = () => {
  return (
    <div className="header">
      <div className="navbar">
        <div className="logo">
            <Link to="/"><img src={logo} alt="Logo" /></Link>
        </div>
        <nav className="nav-items">
          <Link to="/about">О НАС</Link>
          <Link to="/actors">АКТЕРЫ</Link>
          <Link to="/actresses">АКТРИСЫ</Link>
          <Link to="/contacts">КОНТАКТЫ</Link>
        </nav>
        <div className='disktop'>
         <Link to="/login" className='login-link'>Вход</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;