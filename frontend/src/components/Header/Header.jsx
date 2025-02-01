import React from 'react';
import './Header.css'

function Header()
{
return (
<div    //header
className="header"
>
<div    //header-contents
className="header-contents" style={{ animation: 'fadeIn 3s ease-in-out' }}
>
<h2 className="">Order your favorite food here</h2>
<p className="">Choose from the best food items</p>
<button
className="button-click"
>View Menu</button>

</div>


</div>

)
}

export default Header;
