const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    verified:{
        type:Boolean,
        default:false
    }
},{ 
    versionkey:false
})

const Usermodel = mongoose.model("user",userSchema)

module.exports = Usermodel;
