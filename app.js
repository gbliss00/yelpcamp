var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require('mongoose')

mongoose.connect('mongodb://localhost/yelp_camp')
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

//compiling the schema into a model assigned to a variable
var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create (
//     {
//       name: 'Sprout Lake',
//       image: '//static1.squarespace.com/static/577453a2b3db2b317b67f010/t/58ac70908419c25e73c992b7/1487696026271/?format=750w',
//       description: 'Warm swimming lake near Nanaimo and Port Alberni'
//     },
//     function(err,campground){
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Newly created campground:');
//         console.log(campground.name);
//       }
//     });


app.get("/", function(req,res){
  res.render("landing");
});


//INDEX - show all campgrounds - RESTFUL
app.get("/campgrounds", function(req, res){
  //Get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log('error');
    } else {
        res.render("index", {campgrounds: allCampgrounds});    }
  });
});

////CREATE - add new campground to db - RESTFUL
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    //create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/campgrounds");
      };
    });
});

//NEW - display form to make a new campground - RESTFUL
app.get("/campgrounds/new", function(req,res){
  res.render("new.ejs");
});

//SHOW - display a specific campground - RESTFUL
app.get('/campgrounds/:id', function(req,res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err) {
      console.log(err);
    } else {
      res.render('show', {campground: foundCampground});
    }
  });
});


app.get("*", function(req,res) {
	res.send("Sorry, page not found.");
});

app.listen(3000, function(){
        console.log("YelpCamp is up!");
});
