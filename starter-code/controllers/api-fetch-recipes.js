const Recipes = require("../models/recipe.js");

//for Seach bar, input can be ingredient, title or type of dish(main, post-training....)
exports.searchRecipes = (req, res, next) => {
  const ing = req.query.q;
  Recipes.find(
    {
      $or: [
        { type: { $regex: ing, $options: "i" } },
        { title: { $regex: ing, $options: "i" } },
        { ingredients: { $regex: ing } }
      ]
    },
    "title type duration imageURL" //filtre qui permet de voir les caractéristiques qui vont s'afficher
  ).then(result => {
    const newResult = {
      title: result.title
    };
    res.status(200).json(result);
  });
};

//for get Recipe, this one gonna display the details for selected recipe
exports.getRecipe = (req, res, next) => {
  const id = req.query.rID;
  Recipes.findOne({ _id: id }).then(result => {
    res.status(200).json(result);
  });
};
