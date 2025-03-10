import express from "express";
import cors from "cors"
import {connectDB} from './config/db.js'
import 'dotenv/config'
import cookieParser from 'cookie-parser';


const app=express();


//middlewares
// Use express.json() middleware to automatically parse incoming JSON data in request bodies
app.use(express.json())
app.use(cors({
origin:process.env.CORS_ORIGIN,
credentials:true
})) 
app.use(bodyParser.json());
app.use(cookieParser());
// Use express.urlencoded() middleware to automatically parse URL-encoded data from request bodies
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

//connect to DB
connectDB();

//api endpoints

import foodRouter from './routes/food.routes.js';
import userRouter from './routes/user.routes.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';
import bodyParser from "body-parser";
app.use("/api/v1/food",foodRouter); 
app.use("/api/v1/user",userRouter);
app.use("/api/v1/images",express.static("uploads"));
app.use("/api/v1/cart",cartRouter);
app.use("/api/v1/order",orderRouter);


app.get("/api/v1",(req,res)=>{
res.send("Food station backend api")
})


//server activates and starts listening
app.listen(process.env.PORT,()=>{
console.log(`Server listening at http://localhost:${process.env.PORT}/api/v1`);
})