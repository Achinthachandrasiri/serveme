const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workersSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    brandname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    language: {
        type:[String],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
});
  
const workers = mongoose.model("workers_profile", workersSchema);
module.exports = workers;
