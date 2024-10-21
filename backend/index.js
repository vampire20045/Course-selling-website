import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Admin from "./routes/Admin.js";
import User from "./routes/User.js";
import course from "./routes/Course.js";
const app=express();
app.use(cors());
app.use(express.json());
app.use("/Admin",Admin);
app.use("/User",User);
app.use("/Course",Course);
const connect=async()=>{
    try{
    const x=await mongoose.connect("mongodb://localhost:27017/course");
if(x){
    console.log("mongodb connected");
}
else{
    console.log("connection error");
}    
}
    catch(error){
        console.log("internal error");
    }
}
app.listen("3000",()=>{
    console.log("server is ready to serve");
    connect();
})