import mongoose from "mongoose";
import course from "./course.js";
const adminSchema=new mongoose.Schema({
    name:{type:String ,required:true},
    password:{type:String ,required:true},
    purchased:[{type:mongoose.Schema.Types.ObjectId,ref:"course"}]
})
const User=mongoose.model("User",adminSchema);
export default User;