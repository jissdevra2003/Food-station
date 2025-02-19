import { createContext, useState } from "react";
import {food_list} from '../assets/assets.js';


export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{

const [cartItems,setCartItems]=useState({});
/*
const cartItems={
//itemId:quantity
"1":4,
"3":1,
"4":2
}

const food_list = [
  { _id: "1", price: 100 ...},
  { _id: "2", price: 200 ....},
  { _id: "3", price: 50 ....},
*/


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

const getTotalCartAmount=()=>{
let totalAmount=0;
for(const item in cartItems)  //to iterate inside the cartItems object
{
if(cartItems[item]>0)
{
let itemInfo=food_list.find((product)=> product._id===item);
totalAmount+=itemInfo.price*cartItems[item];
}
}
return totalAmount;
}

//the values that we want to pass to the components using context API
const contextValue={
food_list,
cartItems,
setCartItems,
addToCart,
removeFromCart,
getTotalCartAmount
}
return (
<StoreContext.Provider value={contextValue}>
{props.children}

</StoreContext.Provider>
)

}
export default StoreContextProvider;