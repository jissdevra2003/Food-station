import User from '../models/user.model.js';
import validator from "validator"
import asyncHandler from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'




//register user
const registerUser=asyncHandler(async (req,res)=>{
const {name,email,password}=req.body;


if(name.trim()==="") return res.status(400).json({success:false,message:"Name required"});
if(email.trim()==="") return res.status(400).json({success:false,message:"Email required"});
const userExists=await User.findOne({email})
if(userExists) throw new ApiError(400,"User already exists")

if(!validator.isEmail(email)) return res.status(400).json({success:false,message:"Invalid email address entered"});
if(password.length<8) return res.status(400).json({success:false,message:"Password should contain atleast 8 letters"});
//check for special character even if one character found then okk
if(!password.includes("$") && !password.includes("#"))
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
if(!createdUser) throw new ApiError(500,"Unable to process user information")

return res.
status(200)
.json(
new ApiResponse(200,createdUser,"User registered successfully")
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

//now we have stored refreshToken in database in user document
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





export {registerUser,loginUser,getUserProfile}