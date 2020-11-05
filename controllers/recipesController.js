const router = require("express").Router();
const Recipe = require("../models/recipes");
const Ingredient = require("../models/ingredients.js");
const RecipeIngredient = require("../models/recipeIngredients.js");
const recipeIngredients = require("../models/recipeIngredients.js");


//NEW
router.get("/new", async (req, res) => {
  let ingredients = await Ingredient.find();
  res.render("recipes/new.ejs", { ingredients });
});

/*
SHOW RECIPE
*/
router.get("/:id", async (req, res) => {
  let recipeIngredientsFound = new Array();
  let foundRecipes = new Array();
  let foundIngredients;
  foundRecipes = await Recipe.findById(req.params.id).populate(
    "recipeingredient"
  );

  for (let i = 0; i < foundRecipes.recipeingredient.length; i++) {
    foundIngredients = await Ingredient.find(
      foundRecipes.recipeingredient[i].ingredient
    );

    recipeIngredientsFound.push(foundIngredients);
  }
  res.render("recipes/show.ejs", {
    recipe: foundRecipes,
    ingred: recipeIngredientsFound,
  });
});

//INDEX
router.get("/", async (req, res) => {
  let recipes = await Recipe.find();
  res.render("recipes/index.ejs", { recipes });
});

//POST
router.post("/", async (req, res) => {
  console.log(req.body);
  const newRecipeIngredient = [];
  for (let i = 0; i < req.body.measureqty.length; i++) {
    let newIngredient = new RecipeIngredient({
      ingredient: req.body.ingredient1[i],
      measuretype: req.body.measuretype[i],
      measureqty: req.body.measureqty[i],
    });
    let recipeIngredientAdded = await RecipeIngredient.create(newIngredient);
    newRecipeIngredient.push(recipeIngredientAdded);
  }
  try {
    let newRecipe = new Recipe({
      name: req.body.name,
      instruction: req.body.instruction,
      recipeingredient: newRecipeIngredient,
    });
    let newlyAddedRecipe = await Recipe.create(newRecipe);
    console.log(newlyAddedRecipe);
    res.redirect("/recipes");
  } catch (error) {
    res.send(error);
  }
});



//DELETE RECIPE
//delete the recipeingredient as well
router.delete("/:id", async (req, res) => {
  let deletedIngredients = "";
  try {
    let deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    for (let i = 0; i < deletedRecipe.recipeingredient.length; i++) {
      deletedIngredients = await RecipeIngredient.findByIdAndDelete(
        deletedRecipe.recipeingredient[i]
      );
    }
    console.log(deletedIngredients);
    res.redirect("/recipes");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
