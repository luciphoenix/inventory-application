const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  f_name: { type: String, require: true },
  l_name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  cart: [],
  order: [],
});

module.exports = mongoose.model("User", userSchema);
