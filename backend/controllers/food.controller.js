import Food from "../models/food.model.js";
import fs from "fs";
import asyncHandler from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinaryService.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";



//add food item controller(function)

const addFood=asyncHandler(async (req,res)=>{
const {name,description,price,category}=req.body;
// console.log(req.body)
//console.log(req.file)
let imageLocalPath=""
 if(req.file && req.file.path)
{
imageLocalPath=req.file.path;
}
else
{
return res
.status(400)
.json({success:false,message:"Image not found"})
}
const imageFileName=req.file.filename;


const foodImage=await uploadOnCloudinary(imageLocalPath);
if(!foodImage)
{
return res
.status(500)
.json({success:false,message:"Unable to upload image on cloud"})
}
const food=await Food.create({
name:name,
description:description,
price:price,
image:foodImage.url,
category:category,
imagePublicId:foodImage.public_id,
imageLocalPath:imageLocalPath,
imageFileName:imageFileName

});
//console.log(food);
res
.status(200)
.json(
new ApiResponse(200,food,"Food added successfully")
)

})

//display all food items list
const getAllFoodItems=asyncHandler(async (req,res)=>{

  //extract all food items from database
//find method returns an array of objects from the DB collection
const foods=await Food.find({});
if(!foods) throw new ApiError(400,"Unable to fetch food items list")
return res
.status(200)
.json(
new ApiResponse(200,foods,"Food items list fetched successfully")
)





})

const removeFood=asyncHandler(async (req,res)=>{
const food=await Food.findById(req.body.id);
//console.log(food)

//1st
//delete image from cloudinary 
await deleteFromCloudinary(food.imagePublicId,
(error,result)=>{
if(error)
{
throw new ApiError(500,`Failed to delete image from cloudinary ${error.message}`)
}
});

//2nd
//delete image from local storage
fs.unlinkSync(`${food.imageLocalPath}`)

//3rd
//delete food document from database
await Food.findByIdAndDelete(req.body.id);

return res
.status(200)
.json(
new ApiResponse(200,{},"Food item removed successfully")
)
})


export {addFood,
getAllFoodItems,
removeFood
}