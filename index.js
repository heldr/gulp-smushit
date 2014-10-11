'use strict';
var gutil   = require('gulp-util');
var through = require('through2');
var smosh   = require('smosh');

module.exports = function (options) {

	function verboseMode(file, data) {
		if (file.path) {
			gutil.log(file.path);
		}

		gutil.log('Compress rate:', '%', data.percent);
		gutil.log(data.src_size, 'bytes  to  ', data.dest_size, 'bytes');
	}

	function onSmoshEnd(file, cb, contents, data) {
		if (options && options.verbose) {
			verboseMode(file, data);
		}

		file.contents = contents;
		this.push(file);

		cb();
	}

	function onError(err) {
		this.emit('error', new gutil.PluginError('gulp-smushit', err));
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
			.on('error', onError.bind(this));
	});
};
