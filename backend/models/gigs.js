const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const gigsSchema = new Schema({
    accId:{
        type: String,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    subcategory:{
        type: String,
        required:true
    },
    districts :{
        type: String,
        required:true
    },
    electionQuotas:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type: String,
        required:true
    },
    projectsize:{
        type: String,
        required:true
    },
    rules:{
        type: String,
        required:true
    },
    file:{
        type: String,
    },

})
const gigs = mongoose.model("gigs", gigsSchema);
module.exports = gigs;