const Favorite = require("../models/favorite.js");
exports.getUserPage = (req, res, next) => {
  Favorite.findOne({ userId: req.session.user._id })
    .populate("recipes")
    .then(favorite => {
      console.log(favorite.recipes);
      console.log(favorite);
      res.render("user.hbs", {
        favRecipes: favorite.recipes,
        isAuthenticated: req.session.isLoggedIn,
        scripts: ["search-recipes-isloggedin.js"],
        isLiked: true
      });
    });
};
