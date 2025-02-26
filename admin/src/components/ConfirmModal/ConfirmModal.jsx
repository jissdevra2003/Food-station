import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import './ConfirmModal.css'
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';

function ConfirmModal()
{
const {url,itemId,setItemId,list}=useContext(StoreContext)
const {extractList}=useContext(StoreContext);

const removeButtonHandler=async (event)=>{
try
{
const response=await axios.post(`${url}/food/remove`,{id:itemId});
if(response.data.success)
{
toast.success(response.data.message);
extractList();  //to get the updated list data
setItemId("")    //this will hide the confirmModal box
}
else
{
toast.error(response.data.message)
}

}catch(error)
{
console.log(error);

}
}


return (
<>
<div className={`${itemId?"fixed inset-0 h-screen w-screen grid place-items-center z-1 backdrop-blur-xs overflow-hidden ":"hidden"}`}>
<div className="confirm-model-container">
<p>Are you sure you want to delete this item.</p>

<div className='btn-container'>
<button
onClick={removeButtonHandler}
>Yes</button>
<button
onClick={()=>{
setItemId("")
}}
>No</button>
</div>

</div>

</div>
</>
)
}

export default ConfirmModal;