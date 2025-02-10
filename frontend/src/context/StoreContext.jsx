import { createContext, useState } from "react";
import {food_list} from '../assets/assets.js';
import {useEffect} from 'react'


export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{

const [cartItems,setCartItems]=useState({});
const addToCart=(itemId)=>{
// a new entry for any item 
//first time an item is added
if(!cartItems[itemId])
{
setCartItems((prev)=>({...prev,[itemId]:1}))
}
//already existing so increase the count in the cart item
else
{
setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
}
}

const removeFromCart=(itemId)=>{
setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

}

useEffect(()=>{
console.log(cartItems);
},[cartItems])

//the values that we want to pass to the components using context API
const contextValue={
food_list,
cartItems,
setCartItems,
addToCart,
removeFromCart
}
return (
<StoreContext.Provider value={contextValue}>
{props.children}

</StoreContext.Provider>
)

}
export default StoreContextProvider;