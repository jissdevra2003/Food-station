import User from "../models/user.model.js"
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from "../utils/ApiResponse.js";



//add items to cart
const addToCart=asyncHandler(async (req,res)=>{
const {itemId}=req.body;  
if(!itemId)
{
return res.status(400)
.json({success:false,message:"Item id is required"});
}

const user=await User.findById(req.user?._id)

let cartData=user.cartData || {};

//item added for the first time 
if(!cartData[itemId])
{
//cartData object
//itemId(key):quantity(value)

cartData[itemId]=1;
}
//already added in the cart so we will increase the quantity
else
{
//cartData object
//{
//67b9e8e3567177ebc78ec463 : 2
//67b9e8e767177ebc78ec2063 : 6
//}
cartData[itemId]+=1; 
}
await User.findByIdAndUpdate(user._id,
{
$set:{
cartData:cartData
}
},
{
new:true
}
)

return res
.status(200)
.json(new ApiResponse(200,{},"Added to cart"))


})


//remove items from cart
const removeFromCart=asyncHandler(async (req,res)=>{
const {itemId}=req.body;
const user=await User.findById(req.user?._id);
if(!user)
{
return res.status(400)
.json({success:false,message:"User not logged in"})
}
let cartData=await user.cartData || {};
if(cartData[itemId]>0)
{
cartData[itemId]-=1;
}
else
{
return res
.status(400)
.json({success:false,message:"Cart is empty"})
}
await User.findByIdAndUpdate(user._id,
{
$set:{
cartData:cartData
}
},
{new:true}
)
return res.
status(200)
.json(
new ApiResponse(200,{},"Removed from cart")
)


})

//get user cart data
const getCart=asyncHandler(async (req,res)=>{
const user=await User.findById(req.user?._id);
if(!user) 
{
return res.status(400)
.json({success:false,message:"User not logged in"})
}
let cartData=await user.cartData || {};
/*
 "cartData": {
        "67b9e8e767177ebc78ec2063": 1
    },
*/
if(!cartData)
{
return res.json({success:false,message:"Cart is empty"})
}
return res
.status(200)
.json(new ApiResponse(200,cartData,"Cart items fetched successfully"))
})


export {addToCart,removeFromCart,getCart}