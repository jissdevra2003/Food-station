import React, { useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import {useContext,useState} from 'react'
import './PlaceOrder.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PlaceOrder()
{

const {getTotalCartAmount,token,url,food_list,cartItems}=useContext(StoreContext)
const [data,setData]=useState({
firstName:"",
lastName:"",
email:"",
street:"",
city:"",
state:"",
pincode:"",
country:"",
phone:""
});

const onChangeHandler=(event)=>{
const name=event.target.name;
const value=event.target.value;
setData((prevData)=>({...prevData,[name]:value}))
}

const placeOrder=async (event)=>{
event.preventDefault();   //page will not get reloaded
//ordered items array
let orderItems=[];
food_list.map((item)=>{
if(cartItems[item._id]>0)
{
let itemInfo=item;
//add a property in the object (quantity)
itemInfo["quantity"]=cartItems[item._id];
orderItems.push(itemInfo);
}
})
//store the info of user who placed the order
let orderData={
address:data,  //address info
items:orderItems,      //array of objects containing each food item info ordered by user
amount:getTotalCartAmount()+2
}
//send the order data to api 


await axios.post(`${url}/order/place-order`,orderData,{headers:{token}})
.then((response)=>{
if(response.data.success)
{
const {session_url}=response.data.data;
console.log(session_url)
//send the user to the session url
window.location.replace(session_url);
}
else 
{
alert("Error")
}
})
.catch((error)=>{
console.log(error);
})

}

const navigate=useNavigate()
useEffect(()=>{
if(!token)
{
toast.info('Login first to place order')
navigate("/cart")
}
else if(getTotalCartAmount()===0)
{
toast.info("Cart is empty")
navigate("/cart")
}
},[token])


return (
<>
<form 
onSubmit={placeOrder}
className="place-order"
>
<div className="place-order-left">
<p className="title">Delivery Information</p>
<div className="multi-fields">
<input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name"/>
<input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name"/>
</div>
<input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" />
<input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
<div className="multi-fields">
<input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City"/>
<input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State"/>
</div>
<div className="multi-fields">
<input required name="pincode" onChange={onChangeHandler} value={data.pincode} type="text" placeholder="Pin code"/>
<input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country"/>
</div>
<input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />


</div>
<div className="place-order-right">
<div className="cart-total">
<h2 className="font-semibold text-2xl">Cart total</h2>
<div>
<div className="cart-total-details">
<p>Subtotal</p>
<p>${getTotalCartAmount()}</p>
</div>
<hr />
<div className="cart-total-details">
<p>Delivery Fee</p>
<p>${getTotalCartAmount()===0?0:2}</p>
</div>
<hr />
<div className="cart-total-details">
<b>Total</b>
<b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
</div>
</div>
<button type="submit">Proceed to payment</button>
</div>
</div>
</form>
</>
)
}

export default PlaceOrder;