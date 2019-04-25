const Favorite = require("../models/favorite.js");


exports.searchFavorite = (req, res, next) => {
  const ing = req.query.q.toLowerCase();
  Favorite.find(
    {
      $or: [
        { type: { $regex: ing, $options: "i" } },
        { title: { $regex: ing, $options: "i" } },
        { ingredients: { $regex: ing } }
      ]
    },
    "title type duration imageURL" //filtre qui permet de voir les caractéristiques qui vont s'afficher
  )
    .then(result => {
      if (req.path === "/searchapi") {
        return res.status(200).json(result);
      } else {
        res.render("home.hbs");
      }
    })
    .catch(err => {
      console.log(err);
    });
};

//for get Recipe, this one gonna display the details for selected recipe
exports.getRecipe = (req, res, next) => {
  const id = req.query.rID;
  Recipes.findOne({ _id: id })
  .then(result => {
    if(req.path ==="/getapi"){
    res.status(200).json(result);
    } else {
      
    }
  });
};
