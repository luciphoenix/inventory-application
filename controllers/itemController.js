const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Item = require("../models/item");

exports.allItems = asyncHandler(async (req, res, next) => {
  const items = await Item.find().sort({ name: 1 }).exec();
  const name = req.user ? req.user.f_name : "Inventory Application";
  res.render("index", { title: "Inventory Application", items, name });
});

exports.item_detail_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  res.render("item_detail", { item });
});
