var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require('mongoose'),
    Campground = require('./models/campground'),
    Comment    = require('./models/comment'),
    seedDB     = require('./seeds');


mongoose.connect('mongodb://localhost/yelp_camp')
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB()


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
        res.render("campgrounds/index", {campgrounds: allCampgrounds});    }
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
  res.render("campgrounds/new");
});

//SHOW - display a specific campground - RESTFUL
app.get('/campgrounds/:id', function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

//==============================================================================
//NESTED ROUTES FOR comments
//==============================================================================

app.get("/campgrounds/:id/comments/new", function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log(err);
    } else {
    res.render("comments/new", {campground: campground});
    };
  })
  });

  app.post("/campgrounds/:id/comments", function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err) {
          console.log(err);
          res.redirect("/campgrounds");
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      })
    }
  })
  })




app.get("*", function(req,res) {
	res.send("Sorry, page not found.");
});

app.listen(3000, function(){
        console.log("YelpCamp is up!");
});
