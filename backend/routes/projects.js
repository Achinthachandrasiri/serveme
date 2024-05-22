const router = require('express').Router();
const projects =require('../models/projects');

//adding projects................................................................
router.route('/add').post((req,res)=>{
    const accId = req.body.accId;
    const location =req.body.location;
    const task =req.body.task;
    const startDate = req.body.startDate;
    const time = req.body.time;
    const budget = req.body.budget;
    const contact =req.body.contact;

    const newProject = new projects({
        accId,
        location,
        task,
        startDate,
        time,
        budget,
        contact
    })
    newProject.save()
    .then(()=>{
        res.json("project is placed");
    })
    .catch((err) => {
        console.error("project placing is unsuccessful", err);
        res.status(500).json({ error: "project placing is unsuccessful" });
    });

})
    
//fetching projects..............................................................
router.route('/request/:id').get((req, res) => {
    const accId = req.params.id;
    projects.find({accId : accId})
        .then(projects => {
            res.json(projects);
        })
        .catch(err => {
            console.error("Error fetching projects:", err);
            res.status(500).json({ error: "Error fetching projects" });
        });
});
module.exports =router;