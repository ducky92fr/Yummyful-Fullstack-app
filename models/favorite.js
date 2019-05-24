const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }]
});
module.exports = mongoose.model("Favorite", favoriteSchema);
