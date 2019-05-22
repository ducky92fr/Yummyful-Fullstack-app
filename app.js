const bodyParser = require("body-parser");
const express = require("express");
const hbs = require("hbs");
const hbsutils = require("hbs-utils")(hbs);
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const MongoDBStore = require("connect-mongodb-session")(session);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-owbdv.mongodb.net/${
  process.env.MONGO_DEFAULT_DATABASE
}?retryWrites=true`;
const app = express();
app.locals.site_url = process.env.SITE_URL;

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});

const homePageRoutes = require("./routes/homepage");
const userPageRoutes = require("./routes/user");
const apiRecipes = require("./routes/api-fetch-recipes-axios");
const recipesRoutes = require("./routes/recipes");
const authRoutes = require("./routes/auth-routes");
const favoriteRoutes = require("./routes/api-fetch-favorite-axios");

// Express View engine setup
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbsutils.registerPartials(__dirname + "/views/partials");
hbsutils.registerWatchedPartials(__dirname + "/views/partials");

// Middleware Setup
app.use((req, res, next) => {
  if (req.path === "/favicon.ico") {
    console.log("Favicon blocked...");
    return res.send(
      "Blocking favicon to not create more sessions... Implement code for handling favicons."
    );
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  session({
    secret: "susan&duc",
    resave: false, //the session will not be saved on every request that is done.Save only there is something change
    saveUninitialized: true,
    store: store
  })
);
app.use(flash());

app.use(homePageRoutes);
app.use(userPageRoutes);
app.use("/api", apiRecipes);
app.use("/api", favoriteRoutes);
app.use(recipesRoutes);
app.use(authRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log("err");
  });
