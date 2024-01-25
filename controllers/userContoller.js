const passport = require("passport");
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

exports.log_in_get = asyncHandler((req, res, next) => {
  res.render("log-in");
});

exports.log_in_post = asyncHandler((req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })(req, res, next);
});

exports.log_out_get = asyncHandler((req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});
