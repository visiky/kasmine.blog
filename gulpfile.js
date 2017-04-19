const gulp = require("gulp"),
  connect=require("gulp-connect"),
  exec = require("child_process")
  .exec;
// 使用node的child_process模块的exec 执行，命令行脚本

gulp.task('build', function () {
  exec('jekyll build');
  // 添加自动刷新 -- 暂时无效
  // gulp.src('./**/*.html')
    // .pipe(connect.reload());
});

gulp.task('watch',function(){
  gulp.watch("./_posts/*.md",["build"]);
  gulp.watch("./**/*.html",["build"]);
  gulp.watch("/**/*.js",["build"]);
  gulp.watch("/**/*.css",["build"]);
  gulp.watch("*",["build"]);
  
});

gulp.task("connect",function(){
    connect.server({
      // host:"",// 默认localhost
      port:1010, //默认8000
      root:'./_site',
      livereload:true
    })
});

gulp.task('default', ['connect','watch']);
