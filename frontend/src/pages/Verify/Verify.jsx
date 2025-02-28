import React, { useContext, useEffect } from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import './Verify.css'
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from 'axios';
function Verify()
{
const {url}=useContext(StoreContext);

const [searchParams,setSearchParams]=useSearchParams()
const success=searchParams.get("success");  //values will be recieved as a string
const orderId=searchParams.get("orderId");
const navigate=useNavigate();
console.log(`${orderId}`)


const verifyPayment=async ()=>{
await axios.post(`${url}/order/verify`,{success,orderId})
.then((response)=>{
console.log(response);
if(response.data.success)
{
navigate("/myorders")
}
else
{
navigate("/");
}
})
.catch((error)=>{
console.log(error)
})
}

useEffect(()=>{
verifyPayment();
},[])

return (
<div className="verify">
<div className="spinner"></div>

</div>
)
}

export default Verify;