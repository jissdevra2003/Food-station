import React from 'react';
import { useContext } from 'react';
import './FoodDisplay.css'
import { StoreContext } from '../../context/storeContext';
import FoodItem from '../FoodItem/FoodItem';

function FoodDisplay({
category
})
{

const {food_list}=useContext(StoreContext)

return (
<div className="food-display" id="food-display">
<h2>
Top dishes near you 
</h2>
<p>this is great food</p>
<div className="food-display-list" style={{ animation: 'fadeIn 2s ease-in-out' }}>
{food_list.map((item,index)=>{
  return <FoodItem 
key={index}
id={item._id}
description={item.description}
name={item.name}
price={item.price}
image={item.image} />
})}
</div>

</div>
)
}

export default FoodDisplay;