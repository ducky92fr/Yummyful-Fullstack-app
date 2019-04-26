const Favorite = require("../models/favorite.js");

exports.createFavorite = (req,res,next) => {
  const id = req.query.rID
  Favorite.findOne({userId :req.session.user._id})
  .then(result =>{
    if(result){
      console.log(result)
      const index = result.recipes.findIndex(el=> el.toString() === id )
      index > -1 ? result.recipes.splice(index,1):result.recipes.push(id)
      if(result.recipes.length === 0){
        Favorite.findOneAndDelete({_id:result._id},err =>{
          console.log("delete recipe done")
          console.log(err)})
        console.log(result._id)
      }else {
        Favorite.findOneAndUpdate({_id:result._id},{recipes:result.recipes},err=>{
          console.log('update recipes done')
          console.log(err)
        })
      }
  
    }
    else {
      const favorite = new Favorite({
        userId:req.session.user._id,
        recipes :id
      })
      favorite.save()
      .then(()=>console.log("succes save"))
      .catch(err =>console.log(err))
    }
  })
}