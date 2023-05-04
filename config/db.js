const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb+srv://Mohima:mohima@cluster0.nniwend.mongodb.net/chatapp')

module.exports= connection;
