import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './LoginPopUp.css'
import { Link } from 'react-router-dom';
function LoginPopUp()
{
const [currLogState,setCurrLogState]=useState("Create new account")

return (
<>

<div className="login-popup">

<form  className="login-popup-container" style={{ animation: 'fadeIn 0.3s ' }}>
<div className="login-logo">
<img src={assets.logo}/>
</div>
<div className="login-popup-title">
<h2>{currLogState}</h2>
<Link to="/"><img 

src={assets.cross_icon} alt="" />
</Link>

</div>
<div className="login-popup-inputs">
{currLogState==="Login"?<></>:<input type="text"
placeholder="Your name"
required
 />
}

<input 
type="email"
placeholder="Email"
required
 />
<input 
type="password"
placeholder='Password'
required
 />
</div>
<button>{currLogState==="Create new account"?"Create account":"Login"}</button>
<div className="login-popup-condition">
<input type="checkbox" required/>
<p>By continuing I agree to the terms of use & privacy policy.</p>
</div>
{currLogState==="Login"
?<p>Don't have an account? <span onClick={()=>setCurrLogState("Create new account")}>Create a new account</span></p>:
<p>Already have an account? <span onClick={()=>setCurrLogState("Login")}>Sign in</span></p>

}

</form>
</div>
</>
)
}


export default LoginPopUp;