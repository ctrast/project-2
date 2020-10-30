require("dotenv").config();
//___________________
//Dependencies
//___________________
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const app = express();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/coryLocal-project2";

// Connect to Mongo
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

// open the connection to mongo
db.on("open", () => {});

//___________________
//Middleware
//___________________
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//use public folder for static assets
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use("/ingredients", require("./controllers/ingredientsController"));
app.use("/recipes", require("./controllers/recipesController"));

//use method override
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form

//___________________
// Routes
//___________________
//localhost:3000
app.get("/", (req, res) => {
  res.redirect("/recipes");
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Listening on port:", PORT));
