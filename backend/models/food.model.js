import mongoose ,{Schema} from "mongoose";

const foodSchema=new Schema({
name:{
type:String,
required:true,
},
description:{
type:String,
required:true
},
price:{
type:Number,
required:true
},
image:{
type:String,
required:true
},
category:{
type:String,
required:true
},
//cloudinary public_id
imagePublicId:{
type:String,
required:true
},
imageLocalPath:{
type:String,
required:true
},
imageFileName:{
type:String,
required:true
}




}
,{timestamps:true});

const Food= mongoose.models.Food || mongoose.model("Food",foodSchema);
export default Food;