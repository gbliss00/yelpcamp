var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    flash          = require("connect-flash"),
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
//local db connection
//mongoose.connect('mongodb://localhost/yelp_camp');
//mlab remote database connection
mongoose.connect('mongodb://yelpcamper:Grassyarn1@ds217671.mlab.com:17671/yelp_campdb');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})


//DRYING OUT ROUTES, BINDING ROUTES TO APP
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//Heroku port setup
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

// app.listen(3000, function(){
//         console.log("YelpCamp is up!");
// });
