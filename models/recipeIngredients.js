const mongoose = require("mongoose");
const recipeIngredientSchema = new mongoose.Schema(
  {
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
    measuretype:{
        type:String,
        default: '',
      },
    measureqty: {
        type:String,
        default: '',
      },
  },
  { timestamps: true }
);
module.exports = mongoose.model("RecipeIngredient", recipeIngredientSchema);
