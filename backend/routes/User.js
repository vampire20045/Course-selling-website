import Router from "Router";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import Admin from "../model/admin.js";
import course from "../model/course.js";
import {Sec} from "../middleware/auth.js"
import {auth} from "../middleware/auth.js";
const router= express.Router();
router.post("/Signup",async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username});
        if(user){
            res.json({message:"user already exits"});
        }
        const newUser= new User({username,password});
        await newUser.save();
        const token =jwt.sign(username,Sec,{expiresIn:"3h"});
        res.json({message:"User signup successfully",token});}
    catch(err){
        res.json({message:"SOmething gone wrong"});
    }
    
})
router.post("/Login",async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username});
        if(user){
            res.json({message:"user already exits"});
        }
        const newUser= new User({username,password});
        await newUser.save();
        const token =jwt.sign(username,Sec,{expiresIn:"3h"});
        res.json({message:"User signup successfully",token});}
    catch(err){
        res.json({message:"SOmething gone wrong"});
    }
    
})

router.post("/Login",async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username:username,password:password});
        if(!user){
            res.json({message:"User not found"});
        }
        else{const token =jwt.sign(username,Sec,{expiresIn:"3h"});
        res.json({message:"User signup successfully",token});}}
    catch(err){
        res.json({message:"SOmething gone wrong"});
    }
    
});
router.post("/course/:courseId",auth,async(req,res)=>{
    try{
        const x=await course.findById(req.params.courseId);
        if(x){
            const user= await User.findOne({username:req.user.username});
       if(user){
        user.purchased.push(x);
        await user.save();
        res.json({message:"course purchased successfully"});
       }
       else{
        res.json({message:"user not found"});
       }
        }
        else{
            res.json({message:"COurse not found"});
        }
    }
    catch(err){
        res.json({message:"something went wrong"});
    }
})
router.get("/showPurchased",auth,async(req,res)=>{
    const user =await User.findOne({username:req.user.username}).populate("purchased");
    if(user){
        res.json({purchased:user.purchased});
    }
    else{
        res.json({message:"User not found"});
    }
})


export default router;