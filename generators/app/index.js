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
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.copy('readme.md', 'readme.md');

    this.remote('dummy-team', 'dummy', this.props.branch, function (err, remote) {
      remote.bulkCopy('index.html', 'index.html');
      remote.bulkCopy('.gitignore', '.gitignore');
      remote.bulkCopy('.editorconfig', '.editorconfig');
      remote.bulkDirectory('grunt', './grunt');
      remote.bulkDirectory('css', './css');
      remote.bulkDirectory('js', './js');
      remote.bulkDirectory('img', './img');
    });
  },

  install: function () {
    if (!this.options['skip-install']) {
      this.spawnCommandSync('npm', ['install'], { cwd: 'grunt'});
      this.spawnCommandSync('grunt', ['build'], { cwd: 'grunt'});
    }
  }
});
