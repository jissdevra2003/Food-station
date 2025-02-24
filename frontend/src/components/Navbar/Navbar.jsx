import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import {toast} from 'react-toastify';
import axios from "axios";

function Navbar()
 {
  const [menu, setMenu] = useState("home");
const {getTotalCartAmount,token,setToken,url}=useContext(StoreContext);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
const logout=async ()=>{

localStorage.removeItem("token");
setToken("");
navigate("/");


}


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
{!token?<Link to="/login"> <button className="button-sign-in">
          Sign in
        </button></Link>
:<div className="navbar-profile">
<img src={assets.profile_icon} alt="" />
<ul className="nav-profile-dropdown">
<li><img src={assets.order_icon} alt="" /><p>Orders</p></li>
<hr />
<li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
</ul>
</div>}
       
      </div>
    </div>
  );
}

export default Navbar;
