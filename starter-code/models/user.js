const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
