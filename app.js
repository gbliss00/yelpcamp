var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "Miracle Beach", image: "https://farm4.staticflickr.com/3696/12370929373_a5e472d812_c.jpg"},
  {name: "Comox Lake", image: "http://evanseguin.com/blog/wp-content/gallery/comox-valley/comox-lake.jpg"},
  {name: "Kye Bay", image: "http://www.comoxvalleyguide.com/wp-content/uploads/2011/11/kye-bay-header.jpg"},
  {name: "Kin Beach", image: "https://media-cdn.tripadvisor.com/media/photo-s/08/b2/f0/c9/kin-beach-provincial.jpg"},
  {name: "Cape Lazo", image: "http://capelazo.com/files/images/1625494_233548943503251_1316333643_n.jpg"},
  {name: "Miracle Beach", image: "https://farm4.staticflickr.com/3696/12370929373_a5e472d812_c.jpg"},
  {name: "Comox Lake", image: "http://evanseguin.com/blog/wp-content/gallery/comox-valley/comox-lake.jpg"},
  {name: "Kye Bay", image: "http://www.comoxvalleyguide.com/wp-content/uploads/2011/11/kye-bay-header.jpg"},
  {name: "Kin Beach", image: "https://media-cdn.tripadvisor.com/media/photo-s/08/b2/f0/c9/kin-beach-provincial.jpg"},
  {name: "Cape Lazo", image: "http://capelazo.com/files/images/1625494_233548943503251_1316333643_n.jpg"},
  {name: "Miracle Beach", image: "https://farm4.staticflickr.com/3696/12370929373_a5e472d812_c.jpg"},
  {name: "Comox Lake", image: "http://evanseguin.com/blog/wp-content/gallery/comox-valley/comox-lake.jpg"},
  {name: "Kye Bay", image: "http://www.comoxvalleyguide.com/wp-content/uploads/2011/11/kye-bay-header.jpg"},
  {name: "Kin Beach", image: "https://media-cdn.tripadvisor.com/media/photo-s/08/b2/f0/c9/kin-beach-provincial.jpg"},
  {name: "Cape Lazo", image: "http://capelazo.com/files/images/1625494_233548943503251_1316333643_n.jpg"},
];

app.get("/", function(req,res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req,res){
  res.render("new.ejs");
});

app.get("*", function(req,res) {
	res.send("Sorry, page not found.");
});

app.listen(3000, function(){
        console.log("YelpCamp is up!");
});
