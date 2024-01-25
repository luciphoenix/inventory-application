const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render("sign_up");
});

exports.sign_up_post = asyncHandler(async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();
  res.redirect("/");
});
