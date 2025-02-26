import React, { useContext } from "react";
import './List.css'
import axios from "axios";
import {toast} from 'react-toastify';
import {useEffect,useState} from 'react';
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/StoreContext.jsx";
function List()
{

const {extractList,list,url,setItemId}=useContext(StoreContext);



useEffect(()=>{
extractList();   //this will set the list array
},[])



return (
<>
<div className="list add">
<p className=""> All food items</p>
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
<img src={`${url}/images/`+item.imageFileName} alt="" />
<p>{item.name}</p>
<p>{item.category}</p>
<p>${item.price}</p>
<div className="remove-button">
<button>
<img 
onClick={()=>setItemId(item._id)}
src={assets.remove_icon} alt="" />
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