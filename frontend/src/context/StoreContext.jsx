import { createContext, useState,useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{

const [cartItems,setCartItems]=useState({});
const url="http://localhost:4000/api/v1";
const [token,setToken]=useState("");
const [food_list,setFoodList]=useState([])
const [user,setUser]=useState(null);
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


const addToCart=async (itemId)=>{
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
if(token)
{
//now using this url data will get stored in the database in users cartData 
await axios.post(`${url}/cart/add`,{itemId},{headers:{token}})
.then((response)=>{
if(response.data)
{
toast.success(response.data.message);
}
})
.catch((error)=>{

toast.error("Error occured");
})
}
}

const removeFromCart=async (itemId)=>{
setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
if(token)
{
await axios.post(`${url}/cart/remove`,{itemId},{headers:{token}})
.then((response)=>{
if(response.data)
{
toast.info(response.data.message);
}
})
.catch((error)=>{
toast.error("Error occured")
})
}
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

const getUserDetails=async ()=>{
try
{
const response=await axios.get(`${url}/user/profile`,{headers:{token}});

// console.log(response)
setUser(response.data.data)

}catch(error)
{
console.log(error)
}
}



const fetchFoodList=async ()=>{
//array of food items objects containing food item info will be recieved as response
await axios.get(`${url}/food/food-list`)
.then((response)=>{
//now we will set the food-list array  [{..},{..},{..} ....]
setFoodList(response.data.data);     
})

}

const loadCartData=async (token)=>{
await axios.post(`${url}/cart/get-cart`,{},{headers:{token}})
.then((response)=>{
setCartItems(response.data.data);
})

}

// This runs only once after the initial render
//and also set the token in local storage when page reloads
useEffect(()=>{
//load data on page
async function loadData()
{
await fetchFoodList();   //fetch the food list and set the food-list array
if(localStorage.getItem("token"))
{
setToken(localStorage.getItem("token"));
await loadCartData(localStorage.getItem("token"))
}
}
//call loadData function
loadData();
},[]);

//the values that we want to pass to the components using context API
const contextValue={
food_list,
cartItems,
setCartItems,
addToCart,
removeFromCart,
getTotalCartAmount,
url,
token,
setToken,
getUserDetails,
user
}
return (
<StoreContext.Provider value={contextValue}>
{props.children}

</StoreContext.Provider>
)

}
export default StoreContextProvider;