import Order from '../models/order.model.js';
import User from '../models/user.model.js'
import Stripe from "stripe";
import asyncHandler from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js';


const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order from frontend
const placeOrder=asyncHandler(async (req,res)=>{
console.log(`11`)
const frontend_url="http://localhost:5173"
if(!req.user)
{
return res.status(400)
.json({success:false,message:"User not authorized"})
}
const {items,amount,address}=req.body;
const newOrder=await Order.create({
userId:req.user._id,
items:items,       //items is an array of objects contaning food items info
amount:amount,
address:address
})

//after placing the order clean the user's cartData
await User.findByIdAndUpdate(req.user._id,
{
$unset:{
cartData:1
}
},
{new:true}
)

//now create payment link using stripe
//whatever item we get from user we are using those items from items array and we are creating 
//the line items for stripe
const line_items=items.map((item)=>({    //returns an array of objects with the following info
price_data:{                       //price of item
currency:"usd",                    //name of item 
product_data:{                     //quantity of item
name:item.name
},
unit_amount:item.price*100*80       //to convert price in inr
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
unit_amount:2*100*80
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

export {placeOrder};