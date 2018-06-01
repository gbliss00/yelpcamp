
var mongoose = require('mongoose');

//Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

//Compiling the schema into a model while at the same time shipping it back to app.js in it's finished form.
module.exports = mongoose.model('Campground', campgroundSchema);
