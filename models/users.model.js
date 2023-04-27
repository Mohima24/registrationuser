const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    image:{
        type:String,
        default:""
    },
    name:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    phone:{
        type:String,
        default:""
    },
    email:String,
    password:String
})

const Usermodel = mongoose.model('user',userSchema) 

module.exports= Usermodel