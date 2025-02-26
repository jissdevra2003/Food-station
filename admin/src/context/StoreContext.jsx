import React from 'react';
import {createContext,useState} from 'react';
import axios from "axios"
import { toast } from 'react-toastify';

export const StoreContext=createContext(null);

function StoreContextProvider(props){

const url="http://localhost:4000/api/v1";
const [itemId,setItemId]=useState("");
const [list,setList]=useState([]);

const extractList=async ()=>{ 
try{                                //this will set the list array
const response=await axios.get(`${url}/food/food-list`);
//console.log(response);
if(response.data.success)
{
toast.success("Food items")
setList(response.data.data)
}
else
{
toast.error("Error extracting food items list");
}
}catch(error)
{
if(error.response)
{
toast.error(error.response.message || "Unexpected error occured");
}
}
}

const contextValue={
extractList,
url,
list,
itemId,
setItemId

}
return (
<StoreContext.Provider value={contextValue}>
{props.children}
</StoreContext.Provider>
)

}

export default StoreContextProvider;