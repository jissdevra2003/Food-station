import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

//convert the token into user id



export const verifyJWT=asyncHandler(async (req,res,next)=>{
try
{

const Token=req.cookies?.token || req.header("Authorization").replace("Bearer ","");
if(!Token){
return res
.status(400)
.json({success:false,message:"Unauthorized access"})
}


const decodedTokenInfo=jwt.verify(Token,process.env.TOKEN_SECRET);
const user=await User.findById(decodedTokenInfo._id).select("-password ");
if(!user){
return res
.status(400)
.json({
success:false,
message:"Invalid access token"
})
}
req.user=user;
next();

}catch(error)
{
console.log(error);
return res
.json({
success:false,
message:"Error"
})
}

})