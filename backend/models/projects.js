const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    accId:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    budget:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
})

const projects = mongoose.model("projects" , projectSchema );
module.exports = projects;