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
if Ingredient ID is NOT used in a recipe - allow delete button action
or return recipe name(s) ingredient is used in.
*/
router.get("/:id", async (req, res) => {
  let canDelete = false;
  let allRecipesFound = new Array();
let recfound =""

  let foundIng = await RecipeIngredient.find({ ingredient: req.params.id });
  if (foundIng === undefined || foundIng.length == 0) {
    canDelete = true;
  } else {
    for (let i = 0; i < foundIng.length; i++) {
     recfound = await Recipe.find({ recipeingredient: foundIng[i].id });
     console.log(`recfound ${recfound}`) 
     if(recfound!=""){
        allRecipesFound.push(recfound)
      }
      canDelete = false;
    }
  }
  console.log(allRecipesFound)
  let foundIngredient = await Ingredient.findById(req.params.id);
  res.render("ingredients/show.ejs", {
    ingredient: foundIngredient,
    canDelete: canDelete,
    allRecipesFound: allRecipesFound,
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
  try{
  let ingredients = await Ingredient.find();
  res.render("ingredients/index.ejs", { ingredients });
  }catch(error) {
    res.send(error);
  }
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

//DELETE INGREDIENT
router.delete("/:id", async (req, res) => {
  try {
    let deletedIngredient = await Ingredient.findByIdAndRemove(req.params.id);
    res.redirect("/ingredients");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
