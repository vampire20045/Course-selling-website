import Router from "Router";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import Admin from "../model/admin.js";
import course from "../model/course.js";
import {Sec} from "../middleware/auth.js"
import {auth} from "../middleware/auth.js";
const router= express.Router();
router.post("/addCourse",auth,async(req,res)=>{
    try{
    const newCourse=new course(req.body);
    await newCourse.save();
    res.json({message:"Course Added successfully",courseId:course.id});

}
    catch(err){
        console.log(err);
    }
})
router.get("/showCourse",auth,async(req,res)=>{
    try{
        const newCourse=await course.find();
        res.json(newCourse);
    }
    catch(err){
        res.json({message:"Something gone wrong"});
    }
})
router.put("/updateCourse:courseId",auth,async(req,res)=>{
    try{
        const NewCourse=await course.findByIdAndUpdate(req.params.courseId,req.body,{new:true});
    if(NewCourse){
        res.json({message:"course successfully updated"});
    }
    else{
        res.json({message:"course not found"});
    }
    }
    catch(err){
        res.json({message:"Something went wrong"});
    }
});
router.delete("/deleteCOurse:courseId",auth,async(req,res)=>{
    try{
        const x= await course.findByIdAndDelete(req.params.courseId);
        if(x){
            res.json({message:"Course successfully deleted"});
        }
        else{
            res.json({message:"course not found"});
        }
    }
    catch(err){
        res.json({message:"Something went wrong"});
    }
});
router.get("/course/:courseId",auth,async(req,res)=>{
    try{
        const x= req.params.courseId;
        const course=await course.findById(x);
        res.json(course);
    }
    catch(err){
        res.json({message:"something went wrong"});
    }
})
export default router;