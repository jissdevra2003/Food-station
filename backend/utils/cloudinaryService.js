import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET

})

const uploadOnCloudinary=async (localPath)=>{
try
{
if(!localPath) throw new ApiError(500,"Image local path invalid")

const response=await cloudinary.uploader.upload(localPath,{resource_type:"auto"});

return response;

}catch(error)
{
fs.unlinkSync(localPath);
return null;
}

}

const deleteFromCloudinary=async (publicId)=>{
try{
if(!publicId) throw new ApiError(400,"Invalid image local path")
const response=await cloudinary.uploader.destroy(publicId,
{
resource_type:"image"
});

}catch(error)
{
throw new ApiError(400,`${error.message}`)
}
}

export {uploadOnCloudinary,deleteFromCloudinary}