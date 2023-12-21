const { watch, series, src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function buildStyles() {
  return src("style.scss").pipe(sass()).pipe(dest("./public/stylesheets/"));
}

function watchTask() {
  watch(["style.scss"], buildStyles);
}
exports.default = series(buildStyles, watchTask);
