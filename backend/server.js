import express from "express";
import cors from "cors"
import {connectDB} from './config/db.js'

const app=express();


//middlewares
app.use(express.json())
app.use(cors()) 

//connect to DB
connectDB();

//api endpoints

import foodRouter from './routes/food.routes.js';
app.use("/api/v1/food",foodRouter); 
app.use("/api/v1/images",express.static("uploads"));


app.get("/api/v1",(req,res)=>{
res.send("Food station backend api")
})


//server activates and starts listening
app.listen(process.env.PORT,()=>{
console.log(`Server listening at http://localhost:${process.env.PORT}/api/v1`);
})