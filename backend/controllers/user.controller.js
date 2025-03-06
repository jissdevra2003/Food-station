import User from '../models/user.model.js';
import validator from "validator"
import asyncHandler from '../utils/asyncHandler.js'
import { sendEmail } from '../utils/sendEmail.js';
import {ApiResponse} from '../utils/ApiResponse.js'
import crypto from "crypto"
import bcrypt from "bcrypt"




//register user
const registerUser=asyncHandler(async (req,res)=>{
const {name,email,password}=req.body;


if(name.trim()==="") return res.status(400).json({success:false,message:"Name required"});
if(email.trim()==="") return res.status(400).json({success:false,message:"Email required"});
const userExists=await User.findOne({email})
if(userExists)
{
return res.status(400)
.json({success:false,message:"User already registered"})
}

if(!validator.isEmail(email)) return res.status(400).json({success:false,message:"Invalid email address entered"});
if(password.length<8) return res.status(400).json({success:false,message:"Password should contain atleast 8 letters"});
//check for special character even if one character found then okk
if(!password.includes("@") && !password.includes("$") && !password.includes("#"))
{
return res.json({success:false,message:"Password should contain atleast one special character like (@#)"});
}


//now save the user info in DB  
const user=await User.create({
name:name,
email:email,
password:password

})
const createdUser=await User.findById(user._id).select("-password");
if(!createdUser)
{
return res.status(500)
.json({success:false,message:"Unable to process user information"})
}

return res.
status(200)
.json(
new ApiResponse(200,createdUser,"User registered successfully, now login using Email id and password")
)


})





//login user
const loginUser=asyncHandler(async (req,res)=>{
const {email,password}=req.body;
//check for email
if(!email) res.json({success:false,message:"User with this email doesn't exists"})
//find user from database using the email 
const user=await User.findOne({email});
if(!user) return res.json({success:false,message:"User not found"})
//check for password
const validPassword=await user.isPasswordCorrect(password);
if(!validPassword) 
{
return res.status(400)
.json(
{success:false,message:"Invalid password"}
)
}




const token=await user.generateToken();


const loggedInUser=await User.findById(user._id).select("-password");

const options={
httpOnly:true,
secure:true
}

return res
.status(200)
.cookie("token",token,options)
.json(
new ApiResponse(200,{
user:loggedInUser,
token
},
"Logged in successfully"
)
)

})

const getUserProfile=asyncHandler(async (req,res)=>{
if(!req.user)
{
return res.status(400)
.json({success:false,message:"Login first"})
}
const user=await User.findById(req.user._id).select("-_id -password -createdAt -updatedAt -__v");
if(!user)
{
return res.status(500)
.json({success:false,message:"Unable to fetch user details"})
}
 return res.status(200)
.json(
new ApiResponse(200,user,"User details fetched successfully")
)

})

const forgotPassword=asyncHandler(async (req,res)=>{
const {email}=req.body
console.log(email)
if(email.trim()==="") 
{
return res
.status(400)
.json({success:false,message:"Please provide an email address"})
}
const user=await User.findOne({email});
if(!user)
{
return res
.status(404)
.json({success:false,message:"User not found"})
}

const resetToken=crypto.randomBytes(32).toString("hex");
user.resetToken=resetToken;
user.resetTokenExpiry=Date.now()+600000;  //10min  -> 600ms
await user.save();
const resetLink=`https://localhost:4000/reset-password?token=${resetToken}`
 await sendEmail(user.email, "Password Reset Request", `Click here to reset your password: ${resetLink}`);

return res.json({message:"Password reset link sent to your email"})

})

const resetPassword=asyncHandler(async (req,res)=>{
const {token,password}=req.body
const user=await User.findOne({resetToken:token,
resetTokenExpiry:{$gt:Date.now()}
})
if(!user)
{
return res
.status(400)
.json({success:false,message:"Invalid or expired token"})
}

user.password=await bcrypt.hash(password,10);
user.resetToken=undefined;
user.resetTokenExpiry=undefined;
await user.save();
return res.json({message:"Password reset successfully"})


})





export {registerUser,loginUser,getUserProfile,forgotPassword,resetPassword}