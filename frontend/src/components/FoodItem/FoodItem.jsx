import React from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import {useState} from 'react';
import {useContext} from 'react';
import {StoreContext} from '../../context/StoreContext.jsx';

//for displaying the food item info
function FoodItem(
{
id,
name,
price,
description,
image
}
)
{

const {cartItems,addToCart,removeFromCart}=useContext(StoreContext);
// cloudinary image url 
//console.log(image);

return (
<div className="food-item">

<div className="food-item-img-container">
<img
className="food-item-image"
// here image is coming from cloudinary
src={image} alt=""/>
{!cartItems[id]
?<img
className='add-quantity'
onClick={()=>addToCart(id)}
 src={assets.add_icon_white} alt=""/>
:
<div className='food-item-counter'>
<img 

onClick={()=>removeFromCart(id)}
 src={assets.remove_icon_red} alt=""/>
<p className="font-mono">{cartItems[id]}</p>
<img 

onClick={()=>addToCart(id)}
src={assets.add_icon_green} alt=""/>
</div>

}
</div>
<div className="food-item-info">
<div className="food-item-name-rating">
<p>{name}</p>
<img src={assets.rating_starts} alt=""/>
</div>
<p className="food-item-description">{description}</p>
<p className="food-item-price">${price}</p>

</div>
</div>
)
}
export default FoodItem;