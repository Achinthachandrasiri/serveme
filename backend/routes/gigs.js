const router= require('express').Router();
let gigs = require('../models/gigs');
const multer = require('multer');

// Creating image folder with multer..............................................
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "gigImage"); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage });

//adding gigs......................................................................
router.post('/add', upload.single('file'), (req, res) => {
    const {accId,title,category,subcategory,description,price,districts,electionQuotas,projectsize,rules} = req.body;
    const file = req.file.path;
    const newGig = new gigs({
        accId,
        title,
        category,
        subcategory,
        districts,
        electionQuotas,
        description,
        price,
        projectsize,
        rules,
        file
    })
    newGig.save()
    .then(()=>{
        res.json("Gig is added");
    })
    .catch((err) => {
        console.error("Gig adding failed", err);
        res.status(500).json({ error: "Gig adding failed" });
    });
})

//fetching gigs......................................................................
router.route('/allgig/:id').get((req, res) => {
    const accId = req.params.id;
    if(accId) {
        gigs.find({accId : accId})
            .then(gigs => {
                res.json(gigs);
            })
            .catch(error => {
                console.error("Error fetching gig data:", error);
                res.status(500).json("Internal server error");
            });
    } else {
        res.status(401).json("Unauthorized"); 
    }
});

//fetching gigs......................................................................
router.route('/details/:id').get((req, res) => {
    const gigId = req.params.id;
    if(gigId) {
        gigs.findById(gigId)
            .then(gigs => {
                res.json(gigs); // Send user data as JSON response
            })
            .catch(error => {
                console.error("Error fetching gig data:", error);
                res.status(500).json("Internal server error");
            });
    } else {
        res.status(401).json("Unauthorized"); 
    }
});


//Fetching for update.................................................................
router.get('/update/:id', (req, res) => {
    const id = req.params.id;
    gigs.findById({_id: id})
    .then(gigs => {
        res.json(gigs); // Send user data as JSON response
    })
    .catch(error => {
        console.error("Error fetching user data:", error);
        res.status(500).json("Internal server error");
    });
});

//Updating gigs........................................................................
router.put('/edit/:id', (req, res) => {
    const id = req.params.id;
    gigs.findByIdAndUpdate({_id: id}, {
        accId:req.body.accId,
        title: req.body.title,
        category: req.body.category,
        subcategory: req.body.subcategory,
        districts : req.body.districts,
        electionQuotas: req.body.electionQuotas,
        description: req.body.description,
        price: req.body.price,
        projectsize: req.body.projectsize,
        rules: req.body.rules,
        image: req.body.image
    })
    .then(gig => {
        res.json(gig); // Send gig data as JSON response
    })
    .catch(error => {
        console.error("Error updating gig data:", error);
        res.status(500).json("Internal server error");
    });
});

//fetching searching gigs............................................................
router.get('/findWorkers', (req, res) => {
    const { category, subcategory, districts, electionQuotas } = req.query; // Use req.query to get query parameters
    
    if (!category || !subcategory && !districts || !electionQuotas) {
        return res.status(400).json("Category and subcategory are required");
    }

    gigs.find({ category: category, subcategory: subcategory , districts:districts, electionQuotas:electionQuotas || {category: category, subcategory: subcategory , districts:districts}})
    .then(gigs => {
        if (gigs && gigs.length > 0) {
            console.log("Here are your technicians:", gigs);
            res.json(gigs); // Send the gigs as JSON response
        }   
        else {
            console.log("No records found");
            res.status(404).json("No records found"); 
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json("Internal server error"); 
    });
});


//Delete gigs........................................................................
router.delete("/deleteGig/:id", (req, res) => {
    const id = req.params.id;
    gigs.findByIdAndDelete(id)
        .then(deletedGig => {
            if (!deletedGig) {
                return res.status(404).json({ message: "Gig not found" });
            }
            res.json(deletedGig);
        })
        .catch(error => {
            console.error("Error deleting gig:", error);
            res.status(500).json("Internal server error");
        });
});

module.exports =router;