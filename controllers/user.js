const Favorite = require("../models/favorite.js");
exports.getUserPage = (req, res, next) => {
  Favorite.findOne({ userId: req.session.user._id })
    .populate("recipes")
    .then(favorite => {
      res.render("user.hbs", {
        favRecipes: favorite ? favorite.recipes : null,
        isAuthenticated: req.session.isLoggedIn,
        scripts: ["favorite-user-page.js"],
        isLiked: true
      });
    });
};
