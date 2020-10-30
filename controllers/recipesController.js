const router = require('express').Router();
const Recipe = require('../models/recipes');

// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//       return next();
//     } else {
//       res.redirect('/sessions/new');
//     }
//   };

router.get('/', async (req, res) => {
    let recipes = await Recipe.find();
  res.render('recipes/index.ejs', {recipes});
});


module.exports = router;