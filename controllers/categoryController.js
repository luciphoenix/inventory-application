const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Item = require("../models/item");

exports.allCategory = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec();
  res.render("all_category", { categories });
});

exports.category_detail_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  const categ_item = await Item.find({ category: req.params.id }).exec();
  res.render("category_detail", { category, categ_item });
});
