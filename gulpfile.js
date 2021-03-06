var gulp = require('gulp'),
    del = require('del'),
    path = require('path'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify');

var BUILD_DIR = 'build';

gulp.task('clean', function(cb){
  del([BUILD_DIR],cb);
});

gulp.task('copy', function () {
  var inputs = [
    'node_modules/react/dist/react-with-addons.*',
    'src/index.html'
  ];

  gulp.src(inputs)
    .pipe(gulp.dest(BUILD_DIR));
});

var createBrowserifyTask = function(taskName, entryFile){
  gulp.task(taskName, function() {
    var bundler = browserify({
        entries: [entryFile],
        extensions: ['.coffee'],
        debug: true
      });
    bundler.transform('coffeeify');

    var outputFile = path.basename(entryFile,'.coffee')+".js"
    bundler.bundle()
      .pipe(source(outputFile))
      .pipe(gulp.dest(BUILD_DIR));
  });
};

createBrowserifyTask('browserify','./src/app.coffee');

gulp.task('build',['copy','browserify']);

gulp.task('watch', ['default'], function(){
  var watchOpts = {debounceDelay:2000}; // workaround for editors saving file twice: http://stackoverflow.com/questions/21608480/gulp-js-watch-task-runs-twice-when-saving-files

  gulp.watch( './src/**/*', watchOpts, ['build'] );
});


gulp.task('default', ['clean','build']);
