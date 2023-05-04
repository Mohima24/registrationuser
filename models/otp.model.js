const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    userID:String,
    code:String
})


const LinkModel = mongoose.model('link',linkSchema)

module.exports = LinkModel;