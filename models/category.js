const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category_name: { type: String, require: true },
  category_description: { type: String, require: true },
});

// virtual properties
categorySchema.virtual("url").get(function () {
  return "/inventory/category/" + this._id;
});

module.exports = mongoose.model("Category", categorySchema);
