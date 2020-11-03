const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const RecipeIngredient = require("../models/recipeIngredients.js");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      default: "",
    },
    instruction: {
      type: String,
      default: "",
    },
    recipeingredient: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RecipeIngredient",
      },
    ],
  },
  { timestamps: true }
);
var handleE11000 = function(error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next();
  }
};
recipeSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Recipe", recipeSchema);
