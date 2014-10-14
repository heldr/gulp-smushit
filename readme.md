# [gulp](http://gulpjs.com)-smushit [![Build Status](https://travis-ci.org/heldr/gulp-smushit.svg?branch=master)](https://travis-ci.org/heldr/gulp-smushit)

Gulp plugin to optimize PNG and JPG using Yahoo Smushit. Made on top of [smosh](https://github.com/heldr/smosh).

> Smush.it uses optimization techniques specific to image format to remove unnecessary bytes from image files. It is a "lossless" tool, which means it optimizes the images without changing their look or visual quality.

[Read more about Smush.it](http://www.smushit.com/ysmush.it/)

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
