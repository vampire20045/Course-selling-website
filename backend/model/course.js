import mongoose from "mongoose";
import { type } from "os";
const courseSchema = new mongoose.Schema({
    title:{type:String,required:true},
    dis:{type:String,required:true},
    price:{type:Number,required:true},
    img:{type:String},
    published:{type:Boolean},
})
const course=mongoose.model("course",courseSchema);
export default course;