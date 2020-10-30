const router = require("express").Router();
const RecipeIngredient = require("../models/recipeIngredients.js");


// CREATE A NEW INGREDIENT
router.post("/", async (req, res) => {
    console.log(` the ingredient values are ${req.body}`)
    try {
      let newRecIngredient = await RecipeIngredient.create(req.body);
      //res.redirect("/ingredients/new");
    } catch (error) {
      res.send(error);
    }
  });

  module.exports = router;