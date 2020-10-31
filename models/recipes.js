const mongoose = require("mongoose");
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
module.exports = mongoose.model("Recipe", recipeSchema);
