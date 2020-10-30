const router = require('express').Router();
const Ingredient = require('../models/ingredients.js');

// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//       return next();
//     } else {
//       res.redirect('/sessions/new');
//     }
//   };

//New
router.get('/new', (req, res) => {
  res.render('ingredients/new.ejs');
});

//Index
router.get('/', async (req, res) => {
    let ingredients = await Ingredient.find();
  res.render('ingredients/index.ejs', {ingredients});
});

// CREATE A NEW INGREDIENT
router.post('/', async (req, res) => {
    
  try {
    console.log(`here and ${req.body}`)
    let newIngredient = await Ingredient.create(req.body);
    res.redirect("/ingredients/new");
  } catch (error) {
    res.send(error);
  }
});


module.exports = router;