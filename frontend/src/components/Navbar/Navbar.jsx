import React from 'react';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar(
  {
    setShowLogin
  }
) {
  const [menu, setMenu] = useState("home");
  const navigateHome = useNavigate();

  const handleClick = () => {
    navigateHome('/');
  };

  return (
    <div className="navbar">
      <img //logo
        onClick={handleClick}
        className="cursor-pointer mt-1 w-[150px] rounded-full p-8 transition-transform duration-300 ease-in-out hover:scale-105 mb-5 ml-7 h-31 "
        src={assets.logo}
        alt="logo"
      />
      <ul //navbar menu
        className="navbar-menu"
      >
        <Link to="/" onClick={() => setMenu("home")} className={`
          ${menu === "home" ? "active border-b-4 rounded-b-sm border-solid" : ""}
        `}>Home</Link>
        <li onClick={() => setMenu("menu")} className={`
          ${menu === "menu" ? "active border-b-4 rounded-b-sm border-solid" : ""}
        `}>Menu</li>
        <li onClick={() => setMenu("about")} className={`
          ${menu === "about" ? "active border-b-4 rounded-b-sm border-solid" : ""}
        `}>About</li>
        <li onClick={() => setMenu("contact_us")} className={`
          ${menu === "contact_us" ? "active border-b-4 rounded-b-sm border-solid" : ""}
        `}>Contact Us</li>
      </ul>
      <div //navbar-right
        className="navbar-right"
      >
        <img src={assets.search_icon} alt="err" className="transition-transform duration-300 ease-in-out hover:scale-110" />
        <div className="navbar-basket-icon relative">
          <Link
            to="/cart"
          ><img src={assets.basket_icon} alt="err" className="" /></Link>
          <div //dot
            className="
              absolute min-w-[10px] min-h-[10px] bg-neutral-800 rounded-[5px] top-[-8px] right-[-8px]
            "
          ></div>
        </div>
       <Link to="/login"> <button className="button-sign-in"
          onClick={() => setShowLogin(true)}
        >
          Sign in
        </button></Link>
      </div>
    </div>
  );
}

export default Navbar;
