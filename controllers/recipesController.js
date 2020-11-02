const router = require('express').Router();
const Recipe = require('../models/recipes');
const Ingredient = require("../models/ingredients.js");
const RecipeIngredient = require("../models/recipeIngredients.js");
const recipeIngredients = require('../models/recipeIngredients.js');

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

/*
SHOW RECIPE
*/
router.get("/:id", async (req, res) => {
  let recipeIngredientsFound = new Array();
  let foundRecipes = new Array();
  let foundIngredients
 foundRecipes = await Recipe.findById(req.params.id).populate("recipeingredient");
 
  for(let i=0 ; i<foundRecipes.recipeingredient.length; i++){
    foundIngredients = await Ingredient.find(foundRecipes.recipeingredient[i].ingredient);
   
    recipeIngredientsFound.push(foundIngredients)
  }
  console.log(foundRecipes)
  console.log(recipeIngredientsFound)
  res.render("recipes/show.ejs", {
    recipe: foundRecipes, ingred: recipeIngredientsFound
  });
});



//INDEX
router.get('/', async (req, res) => {
    let recipes = await Recipe.find();
  res.render('recipes/index.ejs', {recipes});
});

//POST
router.post("/", async (req, res) => {
 //console.log(req.body)
 const newRecipeIngredient =[];
    for(let i =0; i<req.body.ingredient.length;i++){
      if(req.body.ingredient[i]!='none'){
       let newIngredient = new RecipeIngredient({ingredient: req.body.ingredient[i], measuretype:req.body.measuretype[i], measureqty: req.body.measureqty[i]})
       let recipeIngredientAdded = await RecipeIngredient.create(newIngredient)
       newRecipeIngredient.push(recipeIngredientAdded);
       console.log(newRecipeIngredient)
      }
    }
  
  try {
    let newRecipe = new Recipe({name: req.body.name, instruction: req.body.instruction, recipeingredient:newRecipeIngredient})
  let newlyAddedRecipe = await Recipe.create(newRecipe);
    res.redirect('/recipes');
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;