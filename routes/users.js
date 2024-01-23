var express = require("express");
var router = express.Router();
const userController = require("../controllers/userContoller");

/* GET users listing. */
router.get("/sign-up", userController.sign_up_get);

module.exports = router;
