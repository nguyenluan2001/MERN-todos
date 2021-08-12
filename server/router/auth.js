const express=require("express")
const router=express.Router()
const User=require("../models/User")
const md5=require("md5")
const jwt=require("jsonwebtoken")
require('dotenv').config()
const {checkAuth} =require("../middleware/auth")
router.post("/register",async (req,res)=>{
    let {username,password}=req.body
    if(!username || !password)
    {
        return res.json(400).json({status:"fail",message:"Username of password is missing"})
    }
    try
    {
        let user=await User.findOne({username:username})
        if(user)
        {
            return res.status(400).json({status:"fail",message:"User already existed"})
        }
        else
        {
            let hashPassword=md5(password)
            let newUser=new User({username:username,password:hashPassword})
            await newUser.save()
            return res.status(200).json({status:"success",message:"Register successfully"})

        }
    }
    catch(err)
    {
        return res.status(400).json({status:"fail",message:err.message})
    }
})
router.post("/login",async (req,res)=>{
    let {username,password}=req.body
    console.log(req.body)
    if(!username || !password)
    {
         res.json({status:"fail",message:"User or password is missing"})
    }
    try
    {
        let user=await User.findOne({
            username:username,
            password:md5(password)
        })
        if(user)
        {
            let token=jwt.sign({
                _id:user._id
            },process.env.JWT_SECRET)
            res.json({message:"login successfull",token:token})
        }
        else
        {
             res.json({status:"fail",message:"Username or password wrong"})
        }
    }
    catch(err)
    {
        return res.json({error:err.message})
    }
})
router.get("/checkLogin",checkAuth,(req,res)=>{
    try {
		if (!req.user)
			 res.json({ success: false, message: 'User not found' })
		res.json({ success: true, user:req.user })
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: 'Internal server error' })
	}
})
module.exports=router;