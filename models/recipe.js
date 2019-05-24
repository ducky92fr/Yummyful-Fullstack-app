const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  type: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  ingredients: {
    type: Array,
    require: true
  },
  part: {
    type: Number,
    require: true
  },
  duration: {
    type: String,
    require: true
  },
  instructions: {
    type: String,
    require: true
  },
  imageURL: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);
