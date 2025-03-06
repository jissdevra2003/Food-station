import React, { useState,useContext} from "react";
import './Add.css'
import {assets} from '../../assets/assets.js'
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext.jsx";

function Add()
{

const {url}=useContext(StoreContext)

const [image,setImage]=useState(null);
const [errorMessage,setErrorMessage]=useState("");
const [data,setData]=useState({
name:"",
description:"",
price:"",
category:"Salad"

});

//whenever we make changes in the input field this data will be updated using this function
const onChangeHandler=(event)=>{

 const name=event.target.name;
const value=event.target.value;
setData(prevData=>({...prevData,[name]:value}))
}

const handleImageUpload = (e) => {

  const selectedImage = e.target.files[0];
  if (selectedImage) {
    setImage(selectedImage);
    setErrorMessage(""); 
  } else {
    setErrorMessage("Please upload an image.");
  }

};

const onSubmitHandler=async (event)=>{
event.preventDefault();
//create a new FormData object which will hold the form data that you want to send.
const formData=new FormData();
//Add the value of data.name to the form data with the key "name"
formData.append("name",data.name);
formData.append("description",data.description);
formData.append("price",Number(data.price));
formData.append("category",data.category);
formData.append("image",image);
//using axios we send the request to the backend server
//we have written add as post method

//add food in the database
await axios.post(`${url}/food/add`,formData)
.then((response)=>{
//if successfull reset the data in the form 
//console.log(response)
setData({
name:"",
description:"",
price:"",
category:"Salad"
})
setImage(null)
toast.success(response.data.message);
})
.catch((error)=>{
//console.log(error)
toast.error(error.response.data.message);
})
}







return (
<>
<div className="add">
<form className="" onSubmit={onSubmitHandler}>
<div className="add-img-upload">
<p className="text-lg">Upload Image</p>
<label htmlFor="image">    
{/* to show the preview of image, if a image is uploaded show that otherwise show upload image only */}
<img src={image?URL.createObjectURL(image):assets.upload_area } alt="" />  
</label>
<input 
type="file"     //allows user to select file from their computer 
name="image" 
id="image"   //linking input field to the label element
hidden 
onChange={(event)=>{
handleImageUpload(event);
onChangeHandler(event);
}}   
 />
</div>
<div className="add-product-name">
<p className="text-lg">Product name</p>                            
<input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" required/>
</div>
<div className="add-product-description">
<p className="text-lg">Product description</p>
<textarea onChange={onChangeHandler} value={data.description} name="description"  rows="5" placeholder="Type here" required></textarea>
</div>
<div className="add-category-price">
<div className="add-category">
<p className="text-lg">Product category</p>
<select onChange={onChangeHandler} name="category" >
<option value="Pizza">Pizza</option>
<option value="Salad">Salad</option>
<option value="Chinese">Chinese</option>
<option value="Cake">Cake</option>
<option value="Ice cream">Ice cream</option>
<option value="Milk shake">Milk shake</option>
<option value="Rolls">Rolls</option>
<option value="Sweets">Sweets</option>

</select>
</div>
<div className="add-price">
<p className="text-lg">Product price</p>
<input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="Enter price here" required />
</div>
</div>

<button
type='submit'
className="add-btn"
>ADD</button>
</form>
</div>
</>
)
}

export default Add;