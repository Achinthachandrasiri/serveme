const router= require('express').Router();
let reveiws = require('../models/reveiws');

//adding reviews................................................................
router.route('/add').post((req, res) => {
    const review = req.body.review;
    const accId = req.body.profileId;
    const newReview = new reveiws({ review,accId });
    newReview.save()
        .then(() => {
            res.json("Review is added");
        })
        .catch((err) => {
            console.error("Review adding failed", err);
            res.status(500).json({ error: "Review adding failed" });
        });
});

//fetching reviews...............................................................
router.route('/').get((req, res) => {
    reveiws.find()
        .then(gigs => {
            res.json(gigs);
        })
        .catch(err => {
            console.error("Error fetching reveiws:", err);
            res.status(500).json({ error: "Error fetching reveiws" });
        });
});
module.exports= router;