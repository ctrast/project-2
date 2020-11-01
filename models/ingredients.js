const mongoose = require("mongoose");
const ingredientSchema = new mongoose.Schema(
{
  name: {
    type: String,
    unique: true,
    required: true,
  },
},
{ timestamps: true }
);
module.exports = mongoose.model("Ingredient", ingredientSchema);
