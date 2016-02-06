'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var dummysay = require('dummysay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have the dummy greet the user.
    this.log(dummysay(
      'Welcome to the ' + chalk.blue('dummy') + ' factory!'
    ));

    var prompts = [{
      type: 'list',
      name: 'branch',
      message: 'Would you like to install the beta version?',
      choices: ['master', 'beta'],
      default: 'master'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;

      done();
    }.bind(this));
  },

  writing: function () {
    this.copy('readme.md', 'readme.md');
    var self = this;
    this.remote('dummy-team', 'dummy', this.props.branch, function (err, remote) {
      self.fs.copy(remote.cachePath + '/index.html', 'index.html');
      self.fs.copy(remote.cachePath + '/.gitignore', '.gitignore');
      self.fs.copy(remote.cachePath + '/.editorconfig', '.editorconfig');
      self.fs.copy(remote.cachePath + '/grunt', './grunt');
      self.fs.copy(remote.cachePath + '/css', './css');
      self.fs.copy(remote.cachePath + '/js', './js');
      self.fs.copy(remote.cachePath + '/img', './img');
    });
  },

  install: function () {
    if (!this.options['skip-install']) {
      this.spawnCommandSync('npm', ['install'], { cwd: 'grunt'});
      this.spawnCommandSync('grunt', ['build'], { cwd: 'grunt'});
    }
  }
});
