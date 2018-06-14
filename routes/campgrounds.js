var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');



//INDEX
router.get("/", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log('error');
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});

//NEW
router.get("/new", isLoggedIn, function(req,res){
  res.render("campgrounds/new");
});

//CREATE
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
      id: req.user._id,
      username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author}
      Campground.create(newCampground, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        console.log(newlyCreated);
        res.redirect("/campgrounds");
      };
    });
});

//SHOW
router.get('/:id', function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

//EDIT
router.get('/:id/edit', checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
      res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE

router.put("/:id", checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        res.redirect('/campgrounds/' + req.params.id);
  });
});

//DESTROY
router.delete("/:id", checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    res.redirect("/campgrounds");
  });
});

//MIDDLEWARE - WILL BE MOVED
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect("/login");
  }
};

function  checkCampgroundOwnership(req, res, next) {
  if(req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground){
          if(err) {
            res.redirect('back');
          } else {
          if(foundCampground.author.id.equals(req.user._id)) {
              next();
    } else {
    res.redirect('back');
  }
}
});
} else {
  res.redirect("back");
}
}


module.exports = router;
