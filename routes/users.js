const express = require("express");
const router = express.Router();
const userController = require("../controllers/userContoller");

/* GET users listing. */
router.get("/sign-up", userController.sign_up_get);
router.post("/sign-up", userController.sign_up_post);

// authentication
router.get("/log-in", userController.log_in_get);
router.post("/log-in", userController.log_in_post);
router.get("/log-out", userController.log_out_get);
router.get("/cart", userController.cart_get);

module.exports = router;
