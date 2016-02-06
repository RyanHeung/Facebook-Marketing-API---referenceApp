/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var HTMLReplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var watch = require('gulp-watch');

var config = {
  HTML: './src/index.html',
  CSS: [
    './src/css/*.css',
  ],
  IMAGE: './src/images/*',
  APP_ENTRY: './src/js/app.js',

  PROD_OUT: 'bundle.min.js',
  PROD_DEST: 'dist/prod',

  DEV_OUT: 'bundle.js',
  DEV_DEST: 'dist/dev',
};

gulp.task('prodCopyCSS', function() {
  gulp.src(config.CSS)
    .pipe(gulp.dest(config.PROD_DEST + '/css'));
});

gulp.task('prodCopyIMG', function() {
  gulp.src(config.IMAGE)
    .pipe(gulp.dest(config.PROD_DEST + '/images'));
});

gulp.task('prodCopyHTML', function() {
  gulp.src(config.HTML)
    .pipe(HTMLReplace({
        'js': 'js/' + config.PROD_OUT
      }))
    .pipe(gulp.dest(config.PROD_DEST));
});

gulp.task('prodBuild', function() {
  browserify({
      entries: [config.APP_ENTRY],
      transform: [reactify],
      cache: {}, packageCache: {}, fullconfigs: true
    })
    .require(
      'facebook-adssdk-node/fsStreamBrowserify',
      {expose: 'fsStream'}
    )
    .bundle()
    .pipe(source(config.PROD_OUT))
    .pipe(streamify(uglify(config.PROD_OUT)))
    .pipe(gulp.dest(config.PROD_DEST + '/js'));
});

gulp.task('devCopyCSS', function() {
  gulp.src(config.CSS)
    .pipe(gulp.dest(config.DEV_DEST + '/css'));
});

gulp.task('devCopyIMG', function() {
  gulp.src(config.IMAGE)
    .pipe(gulp.dest(config.DEV_DEST + '/images'));
});

gulp.task('devCopyHTML', function() {
  gulp.src(config.HTML)
    .pipe(HTMLReplace({
        'js': 'js/' + config.DEV_OUT
      }))
    .pipe(gulp.dest(config.DEV_DEST));
});

gulp.task('devWatch', function() {
  watch(config.CSS, function() {
    gulp.start('devCopyCSS');
  });
  watch(config.IMAGE, function() {
    gulp.start('devCopyIMG');
  });
  watch(config.HTML, function() {
    gulp.start('devCopyHTML');
  });

  var watcher  = watchify(browserify({
      entries: [config.APP_ENTRY],
      transform: [reactify],
      debug: true,
      cache: {}, packageCache: {}, fullconfigs: true
    }).require(
      'facebook-adssdk-node/fsStreamBrowserify',
      {expose: 'fsStream'}
    ));

  return watcher.on('update', function() {
      watcher.bundle()
        .pipe(source(config.DEV_OUT))
        .pipe(gulp.dest(config.DEV_DEST + '/js'))

        console.log('Javascript Updated @' + new Date().toISOString());
    })
    .bundle()
    .pipe(source(config.DEV_OUT))
    .pipe(gulp.dest(config.DEV_DEST + '/js'));
});


gulp.task(
  'production',
  ['prodCopyHTML', 'prodCopyCSS', 'prodCopyIMG', 'prodBuild']
);
gulp.task(
  'development',
  ['devCopyHTML', 'devCopyCSS', 'devCopyIMG', 'devWatch']
);

gulp.task('default',
  [process.env.NODE_ENV === 'production' ? 'production' : 'development']);
