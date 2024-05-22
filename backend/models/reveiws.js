const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const reveiwSchema = new Schema({
    review:{
        type:String,
        require:true
    },
    accId:{
        type:String,
        require:true
    }
})
const reveiws = mongoose.model("reveiws" ,reveiwSchema);
module.exports = reveiws;