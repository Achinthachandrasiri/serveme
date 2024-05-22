require("dotenv/config");
const URL = "mongodb+srv://serveme10200:$10200@serveme.xbpspov.mongodb.net/serveme";
const express = require('express');
const session = require('express-session');
const workerRouter = require("./routes/workers");
const gigsRouter = require("./routes/gigs");
const reveiwRouter = require("./routes/reveiws");
const projectsRouter = require("./routes/projects");
const app =express();
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const cors = require('cors');
const path = require('path');
const PORT = 10200;
const User = require('./models/workers');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin:'http://localhost:3001', credentials: true}));

//Profile image path make as satatic
app.use('/profileImage', express.static(path.join(__dirname, 'profileImage')));

//gig image path make as satatic
app.use('/gigImage', express.static(path.join(__dirname, 'gigImage')));


//mongo Db connecting.............................................
mongoose.connect(URL).then(() => {
//user Login...........................................................................
app.post('/login',(req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(emp => {
            if (emp) { 
                if (emp.password === password) {
                    req.session.userId = emp._id;
                    console.log("Session userId set:", req.session.userId); 
                    res.json("success");
                } else {
                    res.redirect('/login');
                }
            } else {
                res.redirect('/login');
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json("Internal server error");
        });
});
// Getting user from loign...............................................................
app.get('/profile', (req, res) => {
    console.log("Session data: ", req.session);
    const userID = req.session.userId;
    console.log("session id ", userID);
    if (userID) {
        User.findById(userID)
            .then(user => {
                res.json(user); 
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                res.status(500).json("Internal server error");
            });
    } else {
        res.status(401).json("Unauthorized");
    }
});
})

//session..........................................................
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: URL,
    collection: 'sessions'
});

store.on('error', function(error) {
    console.log(error);
});
app.use(session({
    secret: 'HpVk7K04BpFpBSxQcVFDlFsOcoGYcFKn',
    resave: false,
    saveUninitialized: false,
    store: store,
    name:"sessionId",
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

store.on('error', function(error) {
    console.log(error);
});

    //connecting to workers
    app.use("/workers", workerRouter);

    //connecting to gigs
    app.use("/gigs", gigsRouter);

    //connecting to reviews
    app.use("/reviews", reveiwRouter);

     //connecting to projects
    app.use("/projects",  projectsRouter);

    app.listen(PORT, () =>{
        console.log(`app is running ${PORT}`);
});
