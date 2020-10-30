const mongoose = require("mongoose");
const recipeIngredientSchema = new mongoose.Schema(
  {
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
    measuretype: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeasureType",
    },
    measureqty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeasureQTY",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("RecipeIngredient", recipeIngredientSchema);
