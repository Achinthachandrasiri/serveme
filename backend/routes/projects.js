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

//delete project
router.delete('/request/delete/:id', (req, res) => {
    const id = req.params.id.trim();
    projects.findByIdAndDelete(id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully', user });
      })
      .catch(error => {
        console.error("Error deleting data:", error);
        res.status(500).json("Internal server error");
      });
  });
module.exports =router;