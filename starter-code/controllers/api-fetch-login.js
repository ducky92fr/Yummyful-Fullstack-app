const User = require("../models/user.js"); // il faut créer le model User

//for get Recipe, this one gonna display the details for selected recipe
exports.getUser = (req, res, next) => {
  const id = req.query.rID;
  Recipes.findOne({ _id: id }).then(result => {
    res.status(200).json(result);
  });
};
