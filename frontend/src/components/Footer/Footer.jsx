import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';


function Footer()
{
const scrollToTop=()=> {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

return (

<div className="footer" id="footer">
{/* //scroll to top button */}

<div className="footer-content">

<div className="footer-content-left">
<Link to="/"><img
className="cursor-pointer mt-1 w-[150px] rounded-4xl p-4 transition-transform duration-300 ease-in-out hover:scale-105 mb-5 ml-7 h-40"
src={assets.logo}
alt=""
/></Link>
<p>Hannah's Kitchen is a delightful food delivery website that brings gourmet meals straight to your doorstep. With a diverse menu featuring mouth-watering dishes from various cuisines, Hannah's Kitchen ensures a delightful dining experience1. Whether you're craving comfort food or a gourmet feast, their user-friendly website makes ordering seamless and convenient. Enjoy the luxury of restaurant-quality meals in the comfort of your home with Hannah's Kitchen1!</p>
<div className="flex items-center gap-4">
<img
className="h-10 w-10 mx-1 cursor-pointer"
 src={assets.facebook_icon} alt="" />
<img 
className="h-10 w-10 mx-1 cursor-pointer"
src={assets.instagram_icon} alt="" />
<img 
className="h-10 w-10 mx-1 cursor-pointer"
src={assets.x_icon} alt="" />
</div>


</div>
<div className="footer-content-center">
<h2>COMPANY</h2>
<ul>
<li>Home</li>
<li>About us</li>
<li>Delivery</li>
<li>Privacy policy</li>
</ul>
</div>

<div className="footer-content-right">
<h2>Get in touch</h2>
<ul>
<li>+91-6564543765</li>
<li>contact@hannahkitchen.com</li>
</ul>
</div>
</div>
<hr />
<p className='footer-copyright'>Copyright 2025 C Hannah Kitchen - All Right Reserved.</p>
</div>
)
}

export default Footer;