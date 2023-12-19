// #! /usr/bin/env node

console.log(
  'This script populates some test items, category,  to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const categorydetail = {
    category_name: name,
    category_description: description,
  };
  const category = new Category(categorydetail);
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${categorydetail}`);
}

async function itemCreate(
  index,
  name,
  category,
  price,
  number_in_stock,
  description
) {
  const itemdetail = {
    name,
    price,
    number_in_stock,
    description,
  };
  if (category != false) itemdetail.category = category;

  const item = new Item(itemdetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${itemdetail.category}`);
}

async function createCategories() {
  console.log("Adding category");
  await Promise.all([
    categoryCreate(0, "food", "food inventory"),
    categoryCreate(1, "lab equipment", "scientific lab equipmenst"),
    categoryCreate(2, "cloth", "fashion shop storage"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      0,
      "distillator",
      [categories[1]],
      "197",
      "3",
      "description lab"
    ),
    itemCreate(1, "GTP", [categories[2]], "19.7", "14", "description cloth"),
    itemCreate(2, "Pizza", [categories[0]], "17", "18", "description food"),
    itemCreate(
      3,
      "volumetric flask",
      categories[1],
      "23",
      "14",
      "description lab"
    ),
    itemCreate(4, "T-shirt", categories[2], "59", "13", "description cloth"),
  ]);
}
