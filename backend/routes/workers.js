const router = require('express').Router();
const express = require('express');
const app =express();
let workers = require('../models/workers');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Creating image folder with multer..............................................
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "profileImage"); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage });

//adding workers..................................................................
router.post('/add',upload.single('file'),(req, res) => {
    const { firstname, lastname, brandname, email, password, age, description,location, language, mobile, skills} = req.body;
    const file = req.file.path;
    const newWorker = new workers({
        firstname,
        lastname,
        brandname,
        email,
        password,
        age,
        description,
        location,
        language,
        mobile,
        skills,
        file
    });

    newWorker.save()
    .then(()=>{
        res.json("Worker is added");
        console.log(req.file)
    })
    .catch((err) => {
        console.error("Worker adding failed", err);
        res.status(500).json({ error: "Worker adding failed" });
    });
})

// Getting user from user clicking..................................................................
router.get('/checkprofile/:id', (req, res) => {
    const id = req.params.id;
    workers.findById({_id: id})
    .then(user => {
        res.json(user); 
    })
    .catch(error => {
        console.error("Error fetching user data:", error);
        res.status(500).json("Internal server error");
    });
});

// Getting for update..................................................................
router.get('/update/:id', (req, res) => {
    const id = req.params.id;
    workers.findById({_id: id})
    .then(user => {
        res.json(user); 
    })
    .catch(error => {
        console.error("Error fetching user data:", error);
        res.status(500).json("Internal server error");
    });
});

//Updating user.......................................................................
router.put('/edit/:id', (req,res)=>{
    const id = req.params.id;
    workers.findByIdAndUpdate({_id: id},{
        firstname:req.body.firstname, 
        lastname:req.body.lastname, 
        brandname:req.body.brandname, 
        email:req.body.email, 
        password:req.body.password, 
        age:req.body.age,
        description:req.body.description, 
        location:req.body.location, 
        language:req.body.language, 
        mobile:req.body.mobile, 
        skills:req.body.skills, 
        file:req.body.file
    })
    .then(user => {
        res.json(user); 
    })
    .catch(error => {
        console.error("Error updating user data:", error);
        res.status(500).json("Internal server error");
    });
})

//Delete workers........................................................................
router.delete("/deleteAccount/:id" , (req, rse)=>{
    const id = req.params.id;
    workers.findByIdAndDelete({_id: id},{
        firstname:req.body.firstname, 
        lastname:req.body.lastname, 
        brandname:req.body.brandname, 
        email:req.body.email, 
        password:req.body.password, 
        age:req.body.age,
        description:req.body.description, 
        location:req.body.location, 
        language:req.body.language, 
        mobile:req.body.mobile, 
        skills:req.body.skills, 
        file:req.body.file
        
    })
    .then(user => {
        res.json(user); 
    })
    .catch(error => {
        console.error("Error updating user data:", error);
        res.status(500).json("Internal server error");
    });
})
module.exports = router;