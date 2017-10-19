const gulp = require("gulp");
const shell = require('gulp-shell');


gulp.task("default", ()=>{
  gulp.watch("**/*.ts", ()=>{
    return gulp.src('**/*.ts', {read: false})
    .pipe(shell([
      'tsc **/*.ts'
    ]))
  });
});