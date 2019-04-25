exports.getUserPage = (req, res, next) => {
  res.render("user.hbs", {
    isAuthenticated: req.session.isLoggedIn
  });
};

