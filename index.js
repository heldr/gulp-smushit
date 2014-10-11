'use strict';
var gutil   = require('gulp-util');
var through = require('through2');
var smosh   = require('smosh');

module.exports = function (options) {

	function verboseMode(file, data) {
		if (file.path) {
			gutil.log(file.path);
		}

		if (data) {
			gutil.log('gulp-smushit:', 'Compress rate', '%', data.percent);
			gutil.log('gulp-smushit:', data.src_size, 'bytes  to  ', data.dest_size, 'bytes');
		}
	}

	function onSmoshEnd(file, cb, contents, data) {
		if (options && options.verbose) {
			verboseMode(file, data);
		}

		file.contents = contents;

		this.push(file);

		cb();
	}

	function onSmoshError(file, cb, msg) {
		if (msg !== "No savings") {
			return this.emit('error', new gutil.PluginError('gulp-smushit', msg));
		}

		gutil.log('gulp-smushit:', 'No savings for:', file.path);
		this.push(file);

		cb();
	}

	return through.obj(function (file, enc, cb) {
		var newFile = null;

		if (file.isNull()) {
			this.push(file);
			cb();
			return;
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-smushit', 'Streaming not supported'));
			cb();
			return;
		}

		smosh(file.contents)
			.on('end', onSmoshEnd.bind(this, file, cb))
			.on('error', onSmoshError.bind(this, file, cb));
	});
};
