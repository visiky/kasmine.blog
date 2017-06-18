const gulp = require('gulp'),
    spawn = require('gulp-spawn'),
    connect = require('gulp-connect')
    // livereload = require('gulp-livereload');


gulp.task('watch', function() {
    gulp.src('**/*.*')
    .pipe(connect.reload())
})


gulp.task('default', ['watch'], function() {    // 这里的watch，是自定义的，写成live或者别的也行
    
    // spawn({
    //     cmd: 'babel',
    //     args: [
    //         'index.js',
    //         '--watch',
    //         '-o',
    //         'index_after.js'
    //     ]
    // });
    connect.server({
        livereload: true
    })
    // var server = livereload();

    // gulp.watch('**/*.*',  function(file) {
    //     server.changed(file.path);
    // })
    gulp.watch('**/*.*', ['watch']);
})


// TODO:  2017/06/16 未完成自动刷新