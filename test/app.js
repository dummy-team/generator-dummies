'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-dummies:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({'skip-install': true})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.gitignore',
      '.editorconfig',
      'readme.md',
      'index.html',
      'css/src/main.scss',
      'js/src/main.coffee'
      'grunt/gruntfile.coffee'
    ]);
  });
});
