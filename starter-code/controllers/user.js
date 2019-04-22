exports.getUserPage = (req, res, next) => {
  res.render("user.hbs", {
    login: true
  });
};

exports.logoutPage = (req, res, next) => {
  res.render("home.hbs", {
    login: false
  });
};
