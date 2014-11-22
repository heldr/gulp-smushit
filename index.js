'use strict';
var gutil   = require('gulp-util'),
    through = require('through2'),
    smosh   = require('smosh'),
    verbose = false,
    file    = null;

function verboseMode(file, data) {
    if (file.path) {
        gutil.log(file.path);
    }

    if (data) {
        gutil.log('gulp-smushit:', 'Compress rate', '%', data.percent);
        gutil.log('gulp-smushit:', data.src_size, 'bytes  to  ', data.dest_size, 'bytes');
    }
}

function onSmoshEnd(cb, file, data) {
    if (verbose) {
        verboseMode(file, data);
    }

    /*jshint validthis:true */
    this.push(file);

    cb();
}

function onSmoshError(cb, msg, file) {
    if (msg !== "No savings") {
        /*jshint validthis:true */
        return this.emit('error', new gutil.PluginError('gulp-smushit', msg));
    }

    gutil.log('gulp-smushit:', 'No savings for:', file.path);

    /*jshint validthis:true */
    this.push(file);

    cb();
}

module.exports = function (options) {
    if (options && options.verbose) {
        verbose = true;
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

        smosh(file)
            .on('end', onSmoshEnd.bind(this, cb))
            .on('error', onSmoshError.bind(this, cb));
    });
};
