import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema=new Schema({
name:{
type:String,
required:true
},
email:{
type:String,
required:true,
unique:true
},
password:{
type:String,
required:true
},
cartData:{
type:Object,
default:{}
}

},
{timestamps:true,
minimize:false
})

userSchema.pre("save",async function(next){
if(!this.isModified("password")) return next();
this.password=await bcrypt.hash(this.password,10);
next();

})

userSchema.methods.isPasswordCorrect=async function(password)
{

const flag=await bcrypt.compare(password,this.password)
return flag;
}
// userSchema.methods.generateAccessToken=function(){
// return jwt.sign({
// _id:this._id,
// name:this.name,
// email:this.email
// },
// process.env.ACCESS_TOKEN_SECRET,
// {
// expiresIn:process.env.ACCESS_TOKEN_EXPIRY
// }
// )
// }

userSchema.methods.generateToken=function(){

return jwt.sign(
{
_id:this._id
},
process.env.TOKEN_SECRET,
{
expiresIn:process.env.TOKEN_EXPIRY
}

)

}




const User=mongoose.models.User || mongoose.model("User",userSchema)
export default User;