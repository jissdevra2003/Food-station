import React, { useState,useContext, useEffect } from "react";
import './MyOrders.css';
import axios from "axios";
import {StoreContext} from '../../context/StoreContext.jsx';
import { assets } from "../../assets/assets.js";

function MyOrders()
{
const {url,token}=useContext(StoreContext);
const [data,setData]=useState([]);


const fetchOrders=async ()=>{
await axios.post(`${url}/order/user-orders`,{},{headers:{token}})
.then((response)=>{
console.log(response.data.data);
if(response.data.success)
{
setData(response.data.data)
}
})
.catch((error)=>{
console.log(error);
})
}

useEffect(()=>{
if(token)
{
fetchOrders();
}
},[token])

return (
<div className="my-orders">
<h2>My Orders</h2>
<div className="container">
{data.map((order,index)=>{
return (
<div key={index} className="my-orders-order">
<img src={assets.parcel_icon} alt="" />
<p>{order.items.map((item,index)=>{
//last product of the orders so no ","
if(index===order.items.length-1)
{
return `${item.name} x ${item.quantity}`
}
else    //not the last  product so place a ", " at end
{
return `${item.name} x ${item.quantity} , `
}

})}</p>
<p>${order.amount}.00</p>
<p>Items : {order.items.length}</p>
<p><span>&#x25cf;</span> <b>{order.status}</b></p>
<button onClick={fetchOrders}>Track order</button>
</div>

)

})}
</div>
</div>
)
}

export default MyOrders;