const mongoose = require('mongoose')

const Shema = mongoose.Schema
const exerciseShema = new mongoose.Schema({
    username:{type:String,required:true},
    description:{type:String,required:true},
    duration:{type:Number,required:true},
    date:{type:Date,required:true}
},{
    timestamps:true
})

const Exercise = mongoose.model("Exercise",exerciseShema)

module.exports = Exercise