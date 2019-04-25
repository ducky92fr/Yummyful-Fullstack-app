const Favorite = require("../models/favorite.js");


exports.searchFavorite = (req, res, next) => {
  Favorite.find(
    {},
    "title type duration imageURL" //filtre qui permet de voir les caractéristiques qui vont s'afficher
  )
    .then(result => {
        return res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
    });
};

//for get Recipe, this one gonna display the details for selected recipe
exports.getFavorite = (req, res, next) => {
  const id = req.query.rID;
  Recipes.findOne({ _id: id })
  .then(result => res.status(200).json(result))
  .catch(err =>console.log(err))
}


exports.createFavorite = (req,res,next) => {
  const id = req.query.rID
  console.log(id)
  Favorite.findOne({userId : "5cc0f51eddb6e616eb048416"})
  .then(result =>{
    if(result){
      console.log(result)
    }
    else {
      const favorite = new Favorite({
        userId:"5cc0f51eddb6e616eb048416",
        favorite :id
      })
      favorite.save()
      .then(()=>console.log("succes"))
      .catch(err =>console.log(err))
    }
  })
}