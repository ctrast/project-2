const router = require('express').Router();
const Recipe = require('../models/recipes');
const Ingredient = require("../models/ingredients.js");

// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//       return next();
//     } else {
//       res.redirect('/sessions/new');
//     }
//   };

//NEW
router.get("/new", async (req, res) => {
  let ingredients = await Ingredient.find();
  res.render("recipes/new.ejs", {ingredients});
});

//INDEX
router.get('/', async (req, res) => {
    let recipes = await Recipe.find();
  res.render('recipes/index.ejs', {recipes});
});

//POST
router.post("/", async (req, res) => {
  try {
    let newRecipe = awaitRecipe.create(req.body);
    res.redirect("/recipes");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;