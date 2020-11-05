# ![](/images/) **Recipes**

Recipes is a web site where users can add ingredients and create recipes using the ingredients.

### &#x1F535; URL

https://cory-project2.herokuapp.com/recipes

### &#x1F535; Approach 
I began the project with the creation of User Stories for each required route and additional functionality which would make the site easy to use. I then designed the data schema for the Recipe, Recipe Ingredients and Ingredients. 


###### [USER STORIES & ROUTES](https://github.com/ctrast/project-2/blob/main/docs/User%20Stories_Routes.pdf)
###### [RECIPE SCHEMA & MODELS](https://github.com/ctrast/project-2/blob/main/docs/Recipe%20Schema%20:%20Models.jpeg)
###### [WIREFRAME RECIPE HOME](https://github.com/ctrast/project-2/blob/main/docs/Recipe%20WF%20-%20Recipe%20Home.jpeg)
###### [WIREFRAME ADD RECIPE](https://github.com/ctrast/project-2/blob/main/docs/Recipe%20WF%20-%20Add%20Recipe.jpeg)
###### [WIREFRAME EDIT RECIPE](https://github.com/ctrast/project-2/blob/main/docs/Recipe%20WF%20-%20Edit%20Recipe.jpeg)
###### [WIREFRAME ADD INGREDIENT](https://github.com/ctrast/project-2/blob/main/docs/Recipe%20WF%20-%20Add%20Ingredient.jpeg)
###### [WIREFRAME VIEW INGREDIENT](https://github.com/ctrast/project-2/blob/main/docs/Recipe%20WF%20-%20View%20Ingredient.jpeg)


### &#x1F535; Unsolved Problems
* Initially I should have researched recipe sites on the interwebs. I believe I would have noticed earlier that my schema for the Recipe was lacking in Instruction sections which would have allowed the ability to explicitly call out each step and provide additional formatting for ease of reading. 

* Adding Ingredients to a Recipe places the ingredient, measurement type and measurement amount to far apart. I would like them closer together. 



### &#x1F535; User Stories
* As an end user I want to be able to add recipes. A recipe includes the food name, instructions and ingredients with measurements.
* As an end user I want to be able to view recipes. A recipe includes the food name and may contain instructions and ingredients.
* As an end user I want to be able to edit recipes. A recipe includes the food name, instructions and may contain ingredients with measurements.
* As an end user I want to be able to add ingredients. An ingredient includes the ingredient name. 
* As an end user I want to be able to view ingredients. An ingredient includes the ingredient name. 
* As an end user I want to be able to edit an ingredient name. 
* As an end user I want to be able to delete an ingredient. 
* As an end user I want to be able to add ingredients and identify the amount and measurement. 
* As an end user I want to be able to navigate the app.
* As an end user I want to be able to add ingredients and identify the amount and measurement. 
* As an end user I want to be able to see recipes on the home page.


### &#x1F535; Restful Routes - Ingredients

| #  | Action   | URL                   | HTTP Verb  | EJS view filename  | mongoose method                                        |
|----|----------|-----------------------|------------|--------------------|--------------------------------------------------------|
| 1  | Index    | /ingredients/         | GET        | index.ejs          | Ingredient.find()                                      |
| 2  | Show     | /ingredient/id        | GET        | show.ejs           | Ingredient.findById(req.params.id)                     |
| 3  | New      | /ingredients/new      | GET        | new.ejs            | none                                                   |
| 4  | Create   | /ingredients/         | POST       | none               | Ingredient.create(req.body)                            |
| 5  | Edit     | /ingredients/id/edit  | GET        | edit.ejs           | Ingredient.findById(req.params.id)                     |
| 6  | Update   | /ingredients/id       | PUT        | none               | Ingredient.findByIdAndUpdate(req.params.id, req.body)  |
| 7  | Destroy  | /ingredients/id       | DELETE     | none               | Ingredient.findByIdAndRemove(req.params.id)            |

### &#x1F535; Restful Routes Recipes
| #  | Action   | URL                   | HTTP Verb  | EJS view filename  | mongoose method                                        |
|----|----------|-----------------------|------------|--------------------|--------------------------------------------------------|
| 1  | Index    | /ingredients/         | GET        | index.ejs          | Ingredient.find()                                      |
| 2  | Show     | /ingredient/id        | GET        | show.ejs           | Ingredient.findById(req.params.id)                     |
| 3  | New      | /ingredients/new      | GET        | new.ejs            | none                                                   |
| 4  | Create   | /ingredients/         | POST       | none               | Ingredient.create(req.body)                            |
| 5  | Edit     | /ingredients/id/edit  | GET        | edit.ejs           | Ingredient.findById(req.params.id)                     |
| 6  | Update   | /ingredients/id       | PUT        | none               | Ingredient.findByIdAndUpdate(req.params.id, req.body)  |
| 7  | Destroy  | /ingredients/id       | DELETE     | none               | Ingredient.findByIdAndRemove(req.params.id)            |

### &#x1F535; **Technologies Used:**
HTML, CSS, JavaScript, Express, EJS, Mongoose, Mongo, Nodejs, Bootstrap

* HTML - HyperTextMarkUpLanguage - this is the structure of the site
* CSS, Bootstrap - this is the styling of the site
* MongoDB - this is the backend database
* Mongoose - this is the Object Data Modeling (ODM) library used to interact with MongoDB through schemas and models.
* Express.js - this is the web application and API framework for Node.js 
* Node.js - this is a runtime environment which executes JavaScript.
* EJS - this is embedded JavaScript library which allows the usage of JavaScript inside of html content.

## GitHub Project Repo
https://github.com/ctrast/project-2

## POST Recipe Route 

```
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

```

### &#x1F535; Stretch Goals:
#### Recommended Features
* Refactor recipe schema for Instructions - create individual steps
* Auth before ability to Add and View Recipes and Ingredients. 
* Sign up 
* Log In 
* Persist Sessions 


## Contributions:

Usman Bashir - design layout suggestions on /recipes.

