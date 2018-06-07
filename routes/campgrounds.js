var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');



//INDEX - show all campgrounds - RESTFUL
router.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log('error');
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});

////CREATE - add new campground to db - RESTFUL
router.post("/campgrounds", function(req, res){
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
router.get("/campgrounds/new", function(req,res){
  res.render("campgrounds/new");
});

//SHOW - display a specific campground - RESTFUL
router.get('/campgrounds/:id', function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

module.exports = router;
