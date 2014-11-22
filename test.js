'use strict';
var assert      = require('assert'),
    gutil       = require('gulp-util'),
    smushit     = require('./'),
    path        = require('path'),
    fs          = require('fs'),
    JPG         = fs.readFileSync(path.join(__dirname, './test_data/fixtures/dp.jpg'), 'binary'),
    PNG         = fs.readFileSync(path.join(__dirname, './test_data/fixtures/dp.png'), 'binary'),
    expectedJPG = fs.readFileSync(path.join(__dirname, './test_data/expected/dp.jpg'), 'binary'),
    expectedPNG = fs.readFileSync(path.join(__dirname, './test_data/expected/dp.png'), 'binary');

it('should optimize JPG', function (cb) {
    var stream = smushit();

    stream.on('data', function (file) {
        assert.equal(file.contents.toString('binary'), expectedJPG);
    });

    stream.on('end', cb);

    stream.write(new gutil.File({
        path: path.join(__dirname, './test_data/fixtures/dp.jpg'),
        contents: new Buffer(JPG, 'binary')
    }));

    stream.end();
});

it('should optimize PNG', function (cb) {
    var stream = smushit({verbose:true});

    stream.on('data', function (file) {
        assert.equal(file.contents.toString('binary'), expectedPNG);
    });

    stream.on('end', cb);

    stream.write(new gutil.File({
        path: path.join(__dirname, './test_data/fixtures/dp.png'),
        contents: new Buffer(PNG, 'binary')
    }));

    stream.end();
});

it('should not break when bytes are not saved', function (cb) {
    var stream = smushit({verbose:true});

    stream.on('data', function (file) {
        assert.equal(file.contents.toString('binary'), expectedPNG);
    });

    stream.on('end', cb);

    stream.write(new gutil.File({
        path: path.join(__dirname, './test_data/expected/dp.png'),
        contents: new Buffer(expectedPNG, 'binary')
    }));

    stream.end();
});
