const Recipes = require("../models/recipe.js");
const homepageControllers = require("../controllers/homepage.js");

const recipes_per_page = 9;

//for Seach bar, input can be ingredient, title or type of dish(main, post-training....)
exports.searchRecipes = (req, res, next) => {
  const ing = req.query.q.toLowerCase();
  const page = req.query.page || 1;
  let totalPages;
  Recipes.find({
    $or: [
      { type: { $regex: ing, $options: "i" } },
      { title: { $regex: ing, $options: "i" } },
      { ingredients: { $regex: ing } }
    ]
  })
    .countDocuments()
    .then(numRecipes => {
      totalPages = Math.ceil(numRecipes / recipes_per_page);
      return Recipes.find(
        {
          $or: [
            { type: { $regex: ing, $options: "i" } },
            { title: { $regex: ing, $options: "i" } },
            { ingredients: { $regex: ing } }
          ]
        },
        "title type duration imageURL" //filtre qui permet de voir les caractéristiques qui vont s'afficher
      )
        .skip((page - 1) * recipes_per_page)
        .limit(recipes_per_page);
    })
    .then(recipes => {
      const tmp = {
        liked: req.session.liked,
        recipes,
        totalPages
      };
      if (req.path === "/searchapi") {
        return res.status(200).json(tmp);
      } else {
        homepageControllers.renderHomePageConditionnal(req, res, next);
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
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
    });
};
