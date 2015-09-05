# [gulp](http://gulpjs.com)-smushit [![Build Status](https://travis-ci.org/heldr/gulp-smushit.svg?branch=master)](https://travis-ci.org/heldr/gulp-smushit)

Gulp plugin to optimize PNG and JPG using reSmush.it. Made on top of [smosh](https://github.com/heldr/smosh).

> reSmush.it is a FREE alternative to Yahoo Smush.it (deprecated on March 2015). This tool provides a online way to optimize pictures size via a documented webservice.

[Read more about reSmush.it](http://resmush.it/)

Prefer Grunt? [grunt-smushit](https://github.com/heldr/grunt-smushit)

## Install

```sh
$ npm install --save-dev gulp-smushit
```


## Usage

```js
var gulp = require('gulp');
var smushit = require('gulp-smushit');

gulp.task('default', function () {
	return gulp.src('src/**/*.{jpg,png}')
		.pipe(smushit())
		.pipe(gulp.dest('dist'));
});
```

## API

### smushit(options)

#### options

##### verbose

Type: `boolean`  
Default: `false`

Show compress rate stats

## License

MIT © [Helder Santana](https://github.com/heldr)
