import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar()
 {
  const [menu, setMenu] = useState("home");
const {getTotalCartAmount}=useContext(StoreContext);

  const navigateHome = useNavigate();

  const handleClick = () => {
    navigateHome('/');
  };

  return (
    <div className="navbar">
      <img
        className="logo-img"
        onClick={handleClick}
        src={assets.logo}
        alt="logo"
      />
      <ul //navbar menu
        className="navbar-menu"
      >
        <Link to="/" onClick={() => setMenu("home")} className={`
          ${menu === "home" ? "active border-b-4 rounded-b-sm border-solid" : ""}
          navbar-menu-item`}>Home</Link>
        <a href="#explore-menu">
        <li onClick={() => setMenu("menu")} className={`
          ${menu === "menu" ? "active border-b-4 rounded-b-sm border-solid" : ""}
        `}>Menu</li>
</a>
          <a href="#footer">
        <li onClick={() => setMenu("about")} className={`
          ${menu === "about" ? "active border-b-4 rounded-b-sm border-solid" : ""}
        `}>About</li>
          </a>
<a href="#footer">
        <li onClick={() => setMenu("contact_us")} className={`
          ${menu === "contact_us" ? "active border-b-4 rounded-b-sm border-solid" : ""}
        `}>Contact Us</li>
</a>
      </ul>
      <div //navbar-right
        className="navbar-right"
      >
        <img src={assets.search_icon} alt="err" className="search-icon-img" />
        <div className="navbar-basket-icon">
          <Link
            to="/cart"
          ><img src={assets.basket_icon} alt="err"/></Link>
          <div //dot
            className={getTotalCartAmount()===0?"":"dot"}
          ></div>
        </div>
       <Link to="/login"> <button className="button-sign-in">
          Sign in
        </button></Link>
      </div>
    </div>
  );
}

export default Navbar;
