var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    LocalStrategy  = require('passport-local'),
    methodOverride = require('method-override'),
    Campground     = require('./models/campground'),
    Comment        = require('./models/comment'),
    User           = require('./models/user'),
    seedDB         = require('./seeds');

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")

//STANDARD LIBRARY SETUP
mongoose.connect('mongodb://localhost/yelp_camp')
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

//seedDB() //seeds the database via ./seeds.js

//PASSPORT CONFIG===============================================================
app.use(require('express-session')({
  secret: "There are no good local beers",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==============================================================================

//MAKE CURRENT USER AVAAILABLE ON ALL TEMPLATES
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
})


//DRYING OUT ROUTES, BINDING ROUTES TO APP
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



app.listen(3000, function(){
        console.log("YelpCamp is up!");
});
