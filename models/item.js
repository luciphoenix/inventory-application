const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  price: { type: Number, require: true },
  number_in_stock: { type: String, require: true },
});

// virtual properties
itemSchema.virtual("url").get(function () {
  return "/item/" + this._id;
});

module.exports = mongoose.model("Item", itemSchema);
