const Recipes = require("../models/recipe.js");
const homepageControllers = require("../controllers/homepage.js")

//for Seach bar, input can be ingredient, title or type of dish(main, post-training....)
exports.searchRecipes = (req, res, next) => {
  const ing = req.query.q.toLowerCase();
  Recipes.find(
    {
      $or: [
        { type: { $regex: ing, $options: "i" } },
        { title: { $regex: ing, $options: "i" } },
        { ingredients: { $regex: ing } }
      ]
    },
    "title type duration imageURL" //filtre qui permet de voir les caractéristiques qui vont s'afficher
  )
    .then(recipes => {
      const tmp ={
        liked :req.session.liked,
        recipes
      }
      if (req.path === "/searchapi") {

        return res.status(200).json(tmp);
      } else {
        homepageControllers.renderHomePageConditionnal(req,res,next)
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
    console.log(err)
  });
};
