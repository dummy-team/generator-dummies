'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var dummysay = require('dummysay')

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async()

    // Have the dummy greet the user.
    this.log(dummysay(
      'Welcome to the ' + chalk.blue('dummy') + ' factory!'
    ))

    if (this.options['silent']) {
      this.props = { branch: 'master' }
      done()
    }
    else {
      var prompts = [{
        type: 'list',
        name: 'branch',
        message: 'Which version do you need?',
        choices: [
          {name: 'master', value: 'master'},
          {name: 'beta', value: 'beta', disabled: true},
        ],
        default: 'master'
      }]

      this.prompt(prompts, function (props) {
        this.props = props
        done()
      }.bind(this))
    }
  },

  writing: function () {
    this.copy('readme.md', 'readme.md')
    var self = this
    var done = this.async()
    this.remote('dummy-team', 'dummy', this.props.branch, function (err, remote) {
      self.fs.copy(remote.cachePath + '/.gitignore', '.gitignore')
      self.fs.copy(remote.cachePath + '/.editorconfig', '.editorconfig')
      self.fs.copy(remote.cachePath + '/package.json', 'package.json')
      self.fs.copy(remote.cachePath + '/gulpfile.js', 'gulpfile.js')
      self.fs.copy(remote.cachePath + '/templates', './templates')
      self.fs.copy(remote.cachePath + '/css', './css')
      self.fs.copy(remote.cachePath + '/js', './js')
      self.fs.copy(remote.cachePath + '/img', './img')
      done()
    }, true)
  },

  install: function () {
    if (!this.options['skip-install']) {
      this.spawnCommandSync('yarn', ['install'])
      this.spawnCommandSync('gulp')
    }
  }
})
