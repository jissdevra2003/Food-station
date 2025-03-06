import Order from '../models/order.model.js';
import User from '../models/user.model.js'
import Stripe from "stripe";
import asyncHandler from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js';


const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order from frontend
const placeOrder=asyncHandler(async (req,res)=>{
const frontend_url="http://localhost:5174"
if(!req.user)
{
return res.status(400)
.json({success:false,message:"User not authorized"})
}
const {items,amount,address}=req.body;    //from orderData sent in req body

const newOrder=await Order.create({
userId:req.user._id,
items:items,       //items is an array of objects contaning food items info
amount:amount,
address:address       //address is an object with user's info
})

//after placing the order clean the user's cartData
await User.findByIdAndUpdate(req.user._id,
{
$unset:{ 
cartData:1    //empty the cart after order placed
}
},
{new:true}
)

//now create payment link using stripe
//whatever item we get from user we are using those items from items array and we are creating 
//the line items for stripe
//also amount and quantity
const line_items=items.map((item)=>({    //returns an array of objects with the following info
price_data:{                       //price of item
currency:"usd",                    //name of item 
product_data:{                     //quantity of item
name:item.name
},
unit_amount:item.price*100       //to convert price in inr
},
quantity:item.quantity
})
);

line_items.push({     //in the line_items array we are creating one more entry for delivery charges
price_data:{
currency:"usd",
product_data:{
name:"Delivery charges"
},
unit_amount:2*100
},
quantity:1
})


//now create a session for payment
const session=await stripe.checkout.sessions.create({
line_items:line_items,
mode:"payment",
// //// here we have created the route verify where we have added the parameters  
success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
})



return res.
status(200)
.json(
new ApiResponse(200,{session_url:session.url},"")
)

})

const verifyOrder=asyncHandler(async (req,res)=>{
const {orderId,success}=req.body;
if(success==="true")     //success will come as string in the url
{
await Order.findByIdAndUpdate(orderId,
{
$set:{
payment:true
}
},
{new:true}
)
return res.
status(200)
.json(
new ApiResponse(200,{},"Paid")
)
}
else
{
await findByIdAndDelete(orderId);
return res.json({success:false,message:"Payment failed"})
}
})

//user orders for user myOrders page
const getUserOrders=asyncHandler(async (req,res)=>{
if(!req.user)
{
return res.status(400)
.json({success:false,message:"User not logged in"})
}
const orders=await Order.find({userId:req.user._id});
if(!orders)
{
return res
.status(500)
.json({success:false,message:"Unable to fetch user order details"})
}
return res
.status(200)
.json(
new ApiResponse(200,orders,"Order details fetched successfully")
)



})

//listing orders for admin panel

const listOrders=asyncHandler(async (req,res)=>{
const orders=await Order.find({});
if(!orders)
{
return res.
status(500)
.json({success:false,message:"Unable to fetch orders"})
}
return res.status(200)
.json(
new ApiResponse(200,orders,"List of orders")
)

})

//updating order status
const updateOrderStatus=asyncHandler(async (req,res)=>{
await Order.findByIdAndUpdate(req.body.orderId,
{
$set:{
status:req.body.status
}
},
{
new:true
}
)

return res
.status(200)
.json(
new ApiResponse(200,{},"Status updated")
)

})


export {placeOrder,verifyOrder,getUserOrders,listOrders,updateOrderStatus};