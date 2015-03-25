var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    reactify = require('reactify'),
    watchify = require('watchify'),
    compass = require('gulp-compass'),
    path = require('path');

var production = process.env.NODE_ENV === 'production';


function handleError(task) {
  return function(err) {
    gutil.log(gutil.colors.red(err));
    notify.onError(task + ' failed, check the logs..')(err);
  };
}

function scripts(watch) {
  var bundler, rebundle;
  bundler = browserify('./index.js', {
    basedir: __dirname + '/src/js/',
    debug: !production,
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  });
  if(watch) {
    bundler = watchify(bundler);
  }
  bundler.transform(reactify);

  rebundle = function() {
    var stream = bundler.bundle();
    stream.on('error', handleError('Browserify'));
    stream = stream.pipe(source('bundle.js'));
    return stream.pipe(gulp.dest('./www/js')).pipe(notify({
      title: "MIIXER",
      message: "Scripts Built"
    }));
  };

  bundler.on('update', rebundle);
  return rebundle();
}

function scriptsForm(watch) {
  var bundler, rebundle;
  bundler = browserify('./index-form.js', {
    basedir: __dirname + '/src/js/',
    debug: !production,
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  });
  if(watch) {
    bundler = watchify(bundler);
  }
  bundler.transform(reactify);

  rebundle = function() {
    var stream = bundler.bundle();
    stream.on('error', handleError('Browserify'));
    stream = stream.pipe(source('bundle.js'));
    return stream.pipe(gulp.dest('./www-form/js')).pipe(notify({
      title: "MIIXER",
      message: "Scripts Built"
    }));
  };

  bundler.on('update', rebundle);
  return rebundle();
}




gulp.task('scripts', function() {
  return scripts(false);
});

gulp.task('watchScripts', function() {
  return scripts(true);
});


gulp.task('scriptsForm', function() {
  return scriptsForm(false);
});

gulp.task('watchScriptsForm', function() {
  return scriptsForm(true);
});


gulp.task('styles', function() {
  gulp.src('./src/sass/style.scss')
    .pipe(compass({
      project: path.join(__dirname),
      css: './www/css',
      sass: './src/sass'
    }))
    .on('error', handleError('Compass'))
    // .pipe(gulp.dest('./www'))
    .pipe(notify({
      title: "MIIXER - Styles",
      message: "Styles Built"
    }));


  gulp.src('./src/sass/style_form.scss')
    .pipe(compass({
      project: path.join(__dirname),
      css: './www-form/css',
      sass: './src/sass'
    }))
    .on('error', handleError('Compass'))
    // .pipe(gulp.dest('./www'))
    .pipe(notify({
      title: "MIIXER - Styles",
      message: "Styles Built for FORM"
    }));  

});

gulp.task('watchStyles', function(){
  return gulp.watch('./src/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['watchScripts', 'watchScriptsForm', 'watchStyles']);