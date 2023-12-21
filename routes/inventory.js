const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");

router.get("/", itemController.allItems);
router.get("/item/:id", itemController.item_detail_get);
router.get("/category", categoryController.allCategory);
router.get("/category/:id", categoryController.category_detail_get);

module.exports = router;
