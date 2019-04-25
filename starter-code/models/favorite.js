const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userId :{
    type:Schema.Types.ObjectId,
    ref:"user"
  },
  favorite:[{recipeId:Schema.Types.ObjectId,ref:"recipe"}]
});
module.exports = mongoose.model("User", favoriteSchema);
