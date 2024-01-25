const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// model
const User = require("./models/user");

// modules
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

// routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const inventoryRouter = require("./routes/inventory");

const app = express();

// authentication

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "user do not exist" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Password do no match" });
      }
      return done(null, user);
    } catch (err) {
      console.err(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (err) {
    console.err(err);
  }
});
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/inventory", inventoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
