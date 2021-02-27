const mongoose = require('mongoose')

const Shema = mongoose.Schema

const userShema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3
    }
},{
    timestamps:true
})

const User = mongoose.model('User',userShema)

module.exports = User