const mongoose = require("mongoose");
const ingredientSchema = new mongoose.Schema({
  ingredient: {
    type: String,
    unique: true,
    default: "",
  },
});
module.exports = mongoose.model("Ingredient", ingredientSchema);