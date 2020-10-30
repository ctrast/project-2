const router = require("express").Router();
const Ingredient = require("../models/ingredients.js");

// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//       return next();
//     } else {
//       res.redirect('/sessions/new');
//     }
//   };

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
//NEW
router.get("/new", (req, res) => {
  res.render("ingredients/new.ejs");
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
