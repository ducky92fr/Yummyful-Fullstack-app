require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const hbs = require("hbs");
const hbsutils = require("hbs-utils")(hbs);
const mongoose = require("mongoose");
const app = express();

const homePageRoutes = require("./routes/homepage");
const userPageRoutes = require("./routes/user");
const apiRecipes = require("./routes/api-fetch-recipes");

// Middleware Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express View engine setup
app.use(bodyParser.json()); //to parse json
app.use(bodyParser.urlencoded({ extended: false })); // to parse the regular form data
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbsutils.registerPartials(__dirname + "/views/partials");
hbsutils.registerWatchedPartials(__dirname + "/views/partials");

app.use(homePageRoutes);
app.use(userPageRoutes);
app.use("/api", apiRecipes);

mongoose
  .connect(
    "mongodb+srv://ducky:ducbeo92@cluster0-owbdv.mongodb.net/Project2?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("success");
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
