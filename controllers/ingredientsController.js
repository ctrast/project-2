const router = require("express").Router();
const Ingredient = require("../models/ingredients.js");
const RecipeIngredient = require("../models/recipeIngredients.js");
const Recipe = require("../models/recipes.js");
// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//       return next();
//     } else {
//       res.redirect('/sessions/new');
//     }
//   };

//NEW
router.get("/new", (req, res) => {
  res.render("ingredients/new.ejs");
});

/*
SHOW INGREDIENT
if ingredient is NOT used in a recipe - allow delete button action
or return recipe name ingredient is used in. Pass in Ingredient ID
*/
router.get("/:id", async (req, res) => {
  let canDelete = false;
  let foundRec = "";
  let foundIng = await RecipeIngredient.find({ ingredient: req.params.id });
  if (foundIng === undefined || foundIng.length == 0) {
    canDelete = true;
  } else {
  for (let i = 0; i < foundIng.length; i++) {
    foundRec = await Recipe.find({ recipeingredient: foundIng[i].id });
    canDelete = false;
    
  }
    
  }
  console.log(canDelete);
  console.log(foundIng);
  console.log(foundRec);
  let foundIngredient = await Ingredient.findById(req.params.id);
  res.render("ingredients/show.ejs", {
    ingredient: foundIngredient,
    canDelete: canDelete,
    foundRec: foundRec,
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  Ingredient.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedModel) => {
      res.redirect("/ingredients");
    }
  );
});

// EDIT
router.get("/:id/edit", async (req, res) => {
  let foundIngredient = await Ingredient.findById(req.params.id);
  res.render("ingredients/edit.ejs", { ingredient: foundIngredient });
});

//INDEX
router.get("/", async (req, res) => {
  let ingredients = await Ingredient.find();
  res.render("ingredients/index.ejs", { ingredients });
});

// CREATE A NEW INGREDIENT
router.post("/", async (req, res) => {
  try {
    let newIngredient = await Ingredient.create(req.body);
    res.redirect("/ingredients/new");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
