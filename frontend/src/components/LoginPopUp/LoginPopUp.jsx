import React, {  useState,useContext } from 'react';
import { assets } from '../../assets/assets';
import './LoginPopUp.css'
import { Link ,useNavigate} from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import {toast}  from "react-toastify";



function LoginPopUp()
{
const [currLogState,setCurrLogState]=useState("Login")
const [data,setData]=useState({
name:"",
email:"",
password:""
})

const {url,setToken}=useContext(StoreContext);
const navigate=useNavigate();

//take the data from the input field and save it in the state variable
//whenever we make changes in the input field this data will be updated using this function
const onChangeHandler=(event)=>{
const name=event.target.name            //(name of the input field) 
const value=event.target.value          //value of the field
//update the data  ["email"]:"example@wmail.com" 
setData(prevData=>({...prevData,[name]:value }))
}

const onLogin=async (event)=>{
event.preventDefault();
let newUrl=url;
if(currLogState==="Login")
{
newUrl+="/user/login"
}
else{
newUrl+="/user/register"
}
try{
const response=await axios.post(newUrl,data);

if(response.data.success)
{
//user has the access token  

setToken(response.data.data.token);

localStorage.setItem("token",response.data.data.token);
navigate("/")  //navigating to the home page
toast.success(response.data.message);
}
else
{
toast.error(response.data.message);
}
}catch(error)
{
if(error.response)
{

toast.error(error.response.data.message)
}
}


}


return (
<>

<div className="login-popup">

<form onSubmit={onLogin}  className="login-popup-container" style={{ animation: 'fadeIn 0.3s ' }}>
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
{currLogState==="Login"
?
<></>
:
<input 
type="text"
name="name"
value={data.name}
onChange={onChangeHandler}
placeholder="Your name"
required
 />
}

<input 
type="email"
name="email"
onChange={onChangeHandler}
value={data.email}
placeholder="Email"
required
 />
<input 
type="password"
name="password"
value={data.password}
placeholder='Password'
onChange={onChangeHandler}
required
 />
</div>
<Link to="/forgot-password" className="text-blue-500 hover:underline cursor-pointer">Forgot password?</Link>
<button type="submit">{currLogState==="Create new account"?"Create account":"Login"}</button>
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