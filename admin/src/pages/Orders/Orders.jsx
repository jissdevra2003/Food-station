import React from "react";
import './Orders.css'
import { useContext,useState,useEffect } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";
import {toast} from "react-toastify"
import {assets} from '../../assets/assets.js'

function Orders()
{
const [orders,setOrders]=useState([]);
const {url}=useContext(StoreContext)

const fetchAllOrders=async()=>{
await axios.get(`${url}/order/list-orders`)
.then((response)=>{
 
if(response.data.success)
{
setOrders(response.data.data);
}
else
{
toast.error("Error")
}
})
.catch((error)=>{
console.log(error); 

})
}

const statusHandler=async(event,orderId)=>{
await axios.post(`${url}/order/status`,{
orderId,
status:event.target.value
})
.then(async (response)=>{
if(response.data.success)
{
await fetchAllOrders();
}
})
.catch((error)=>{
console.log(error)
})
}

//only after initial render this useEffect function will get executed
useEffect(()=>{
fetchAllOrders();
},[])


return (
<div className="order add">
<h3>Order page</h3>
<div className="order-list">
{orders.map((order,index)=>{
return (
<div key={index} className="order-item"> 
<img src={assets.parcel_icon} alt="" />
<div>
<p className="order-item-food">
{order.items.map((item,index)=>{
if(index===order.items.length-1)
{
return `${item.name} X ${item.quantity}`
}
else
{
return `Items : ${item.name} X ${item.quantity} , `
}
})}
</p>
<p className="order-user-name">{`Name : ${order.address.firstName.toUpperCase()} ${order.address.lastName.toUpperCase()}`}</p>
<div className="user-address">
<p>{`Address : ${order.address.street} ,`}</p>
<p>{`${order.address.city} , ${order.address.state} , ${order.address.country} , ${order.address.pincode}`}</p>
</div>
<p className="user-phone-email">{`Phone: ${order.address.phone} , Email: ${order.address.email}`}</p>
</div>
<p>{`Items : ${order.items.length}`}</p>
<p>${order.amount}.00</p>
<select onChange={(event)=>{
statusHandler(event,order._id)
}}
value={order.status}
>
<option value="Food processing">Food processing</option>
<option value="Out for delivery">Out for delivery</option>
<option value="Delivered">Delivered</option>
</select>
</div>
)})}
</div>
</div>
)
}

export default Orders;