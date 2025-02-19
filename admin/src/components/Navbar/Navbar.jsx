import React from 'react';
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import {Link} from 'react-router-dom'

function Navbar()
{
return (
<>
<div className="navbar">
<Link><img className="logo" src={assets.logo} alt="" /></Link>
<img className="profile" src={assets.profile_image} alt="" />
</div>
</>
)
}

export default Navbar;