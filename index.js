const express = require('express');
const cors = require('cors')
const connection = require('./config/db')
const userRouter = require('./Routers/users.router')
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/',userRouter)


app.listen(7777,async(req,res)=>{
    console.log(`http://localhost:7777`);
    try{
        connection
        console.log("connected to data base")
    }catch(err){
        console.log(err)
    }
})
