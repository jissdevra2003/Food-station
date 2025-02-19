import React from "react";
import './List.css'
import axios from "axios";
import {toast} from 'react-toastify';
import {useEffect,useState} from 'react';
import { assets } from "../../assets/assets.js";
function List()
{
const [list,setList]=useState([]);

const url="http://localhost:4000/api/v1"

const extractList=async ()=>{
const response=await axios.get(`${url}/food/food-list`);
console.log(response);
if(response.data.success)
{
setList(response.data.data)
}
else
{
toast.error("Error extracting food items list");
}
}

useEffect(()=>{
extractList();
},[])

const removeItemHandler=(e)=>{

}

return (
<>
<div className="list add">
<p>All food items</p>
<div className="list-table">
<div className="list-table-format title">
<b>Image</b>
<b>Name</b>
<b>Category</b>
<b>Price</b>
<b>Action</b>

</div>
{list.map((item,index)=>{
return (
<div key={index} className="list-table">
<div  className="list-table-format">
<img src={`${url}/images/`+item.image} alt="" />
<p>{item.name}</p>
<p>{item.category}</p>
<p>${item.price}</p>
<div className="remove-button">
<button
onClick={removeItemHandler}
>
<img src={assets.remove_icon} alt="" />
</button>
</div>

</div>
<hr />
</div>
)

})}

</div>
</div>

</>
)
}

export default List;