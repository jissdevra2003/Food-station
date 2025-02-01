import React from 'react'
import {assets} from '../../assets/assets';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import './Navbar.css'



function Navbar()
{
const [menu,setMenu]=useState("home");
const navigateHome=useNavigate();

const handleClick=()=>{
navigateHome('/')
}


return (
<div   //navbar
 className="navbar">
<img           //logo
onClick={handleClick}
className=""
src={assets.logo} alt='logo'/>
<ul        //navbar menu
className="navbar-menu"
>
<li onClick={()=> setMenu("home")} className={`
${menu==="home" ?
"active border-b-4 rounded-b-sm border-solid":""
}
`}>Home</li>
{/********  className={`${menu==="home"?"active border-b-2 border-solid":""}`}****** */}
<li onClick={()=> setMenu("menu")} className={`
${menu==="menu" ?
"active  border-b-4 rounded-b-sm border-solid":""
}
`}>Menu</li>
<li onClick={()=> setMenu("menu")} className={`
${
menu==="menu" ?
"active  border-b-4 rounded-b-sm border-solid":""}
`}>Menu</li>
<li onClick={()=> setMenu("contact_us")} className={`
${
menu==="contact_us" ?
"active  border-b-4 rounded-b-sm border-solid":""}
`}>Contact-us</li>
</ul>
<div  //navbar-right
className="navbar-right" 
//navbar search-icon
>
<img src={assets.search_icon} alt="err" className="transition-transform duration-300 ease-in-out hover:scale-110"/>

<div 
className="navbar-basket-icon"
>
<img src={assets.basket_icon} alt="err" className=""/>

<div  //dot
className="
absolute min-w-[10px] min-h-[10px] bg-amber-600 rounded-[5px] top-[-8px] right-[-8px]
" 
></div>
</div>
<button
className="button-sign-in
"
>Sign in</button>



</div>


</div>

)
}

export default Navbar;