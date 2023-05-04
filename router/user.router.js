const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const Usermodel = require('../models/user.model')
const userRouter = express.Router()
const LinkModel = require('../models/otp.model')
require('dotenv').config()

let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    port: 465,
    service:'gmail',
    secure: true,
    auth: {
      user: 'mohimabahadur@gmail.com', 
      pass:'nretquwzpaysbgnk', 
    }
});


userRouter.get('/',(req,res)=>{
    res.send("user page")
})

userRouter.post('/signin',async(req,res)=>{
    const {fullname,email,password} = req.body;
    const finduser = await Usermodel.findOne({email})
    if(finduser){
        res.send({msg:"user already login"})
        return
    }
    bcrypt.hash(password, 7 , function(err, hash) {
        if(err){
            res.send({msg:"error while hashing password"})
        }else{
            const user = new Usermodel({
                fullname,email,password:hash
            })
            user.save()
                .then((result)=>{
                sendlinkverificationEmail(result,res)
            })
        }
    });
})

async function sendlinkverificationEmail({_id,email},res){
    const code = Math.floor(Math.random()*10000)

    let mailS = {
        from: `${process.env.mail}`,
        to: email, 
        subject: "Acoount verification for chatapp ✔",
        html: `<b> Please go through by this link for verification https://easy-erin-buffalo-cape.cyclic.app/app/user/verify/${code}/${_id}<b>`, 
      };

    const newlink = await LinkModel({
        userID:_id,
        code : code,
    })
    await newlink.save()
    await transporter.sendMail(mailS)
    res.json({
        "status":"PENDING",
        message:"Verification link mail sent",
        data:{
            UserID:_id,
            email
        }
    })
}

userRouter.post('/verify/:code/:userID',async (req,res)=>{
    const code = req.params.code;
    const userID = req.params.userID;

    const userFind = await LinkModel.find({userID})
    if(userFind.length<0){
        res.send({
            msg:"invalid user"
        })
        return
    }

    if(userFind[0].code == code){
        await Usermodel.findByIdAndUpdate({_id:userID},{verified:true})
        await LinkModel.deleteMany({userID})
        res.send({
            "status":"Verified",
            "msg":"user has verified"
        })
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const finduser = await Usermodel.find({email})
    if(finduser.length>0 && finduser[0].verified==true){
        bcrypt.compare(password, finduser[0].password, function(err, result) {
            if(result){
                token = jwt.sign({"userID":finduser[0]._id},"userkey")
                res.send({"msg":"succesfully log-in",token})
            }else{

                res.send({error:"error while hashing password"})
            }
        });
    }else{
        res.send("user not found")
    }
})

module.exports= userRouter

