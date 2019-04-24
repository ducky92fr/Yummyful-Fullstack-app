require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const hbs = require("hbs");
const hbsutils = require("hbs-utils")(hbs);
const mongoose = require("mongoose");
const app = express();
const axios = require("axios");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const homePageRoutes = require("./routes/homepage");
const userPageRoutes = require("./routes/user");
const apiRecipes = require("./routes/api-fetch-recipes-axios");
const recipesRoutes = require("./routes/recipes");
const authRoutes = require("./routes/auth-routes");
const User = require("./models/user");

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

app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user);
    });
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(homePageRoutes);
app.use(userPageRoutes);
app.use("/api", apiRecipes);
app.use(recipesRoutes);
app.use("/", authRoutes);
mongoose
  .connect(
    "mongodb+srv://ducky:ducbeo92@cluster0-owbdv.mongodb.net/Project2?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(3000);
  })
  .catch(err => {
    console.log("err");
  });
