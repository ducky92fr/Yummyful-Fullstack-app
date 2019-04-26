const Favorite = require("../models/favorite.js");

exports.createFavorite = (req,res,next) => {
  const id = req.query.rID
  Favorite.findOne({userId :req.session.user._id})
  .then(result =>{
    if(result){
      const index = result.favorite.findIndex(el=> el.toString() === id )
      index > -1 ? result.favorite.splice(index,1):result.favorite.push(id)
      if(result.favorite.length === 0){
        Favorite.findOneAndDelete({_id:result._id},err =>console.log(err))
        console.log(result._id)
      }else {
        Favorite.findOneAndUpdate({_id:result._id},{favorite:result.favorite},err=>console.log(err))
      }
  
    }
    else {
      const favorite = new Favorite({
        userId:req.session.user._id,
        favorite :id
      })
      favorite.save()
      .then(()=>console.log("succes save"))
      .catch(err =>console.log(err))
    }
  })
}