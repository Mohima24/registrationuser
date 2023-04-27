const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usermodel = require("../models/users.model")
const authentication = require("../middleware/authentication")


userRouter.get('/user',(req,res)=>{
    res.send("users page")
})

userRouter.post('/user/register',async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await Usermodel.find({email})
        if(user.length>0){
            res.status(500)
            res.send({"msg":"user Already log in"})
            return;
        }
        bcrypt.hash(password, 7, async(err, hash) => {
           if(err){
                res.status(501)
                res.send({"msg":"error while hashing the password"})
           }else{
                let payload = await Usermodel({email,password:hash})
                payload.save()
                res.send({"msg":"sign up successfully"})
           }
        })
    }catch(err){
        res.send({"msg":"error while register user"})
    }
})

userRouter.post('/user/login',async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await Usermodel.find({email})
        if(user.length<0){
            res.status(500)
            res.send({"msg":"user Already log in"})
            return;
        }
        bcrypt.compare(password, user[0].password, async(err, result) => {
            if(result){
                let token = jwt.sign({ userID: user[0]._id,useremail:user[0].email }, 'userToken')
                res.send({"msg":"Log-in successfully","access_token":token})
            }else{
                res.status(501)
                res.send({"msg":"Please signup"})
            }
        })
    }catch(err){
        res.send({"msg":"error while register user"})
    }
})

userRouter.get("/user/personaldetails",authentication,async(req,res)=>{
    let userID = req.body.userID;
    let data = await Usermodel.findOne({_id:userID})
    res.send(data)
})

userRouter.patch("/user/personaldetails/edit",authentication,async(req,res)=>{
    let userID = req.body.userID;
    let {image,name,bio,phone}=req.body
    let data = await Usermodel.findByIdAndUpdate({_id:userID},{image,name,bio,phone})
    res.send({"msg":"data has updated"})
})

module.exports = userRouter;