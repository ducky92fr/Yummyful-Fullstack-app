const Favorite = require("../models/favorite.js");
exports.getUserPage = (req, res, next) => {
  return res.render("user.hbs", {
    isAuthenticated: req.session.isLoggedIn,
    scripts: ["favorite-user-page.js"]
  });
};
