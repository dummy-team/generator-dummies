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
      this.props = {branch: 'master'}
      done()
    }
    else {
      var prompts = [{
        type: 'list',
        name: 'branch',
        message: 'Would you like to install the beta version?',
        choices: ['master', 'beta'],
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
      self.fs.copy(remote.cachePath + '/index.html', 'index.html')
      self.fs.copy(remote.cachePath + '/.gitignore', '.gitignore')
      self.fs.copy(remote.cachePath + '/.editorconfig', '.editorconfig')
      if (self.props.branch == 'beta') {
        self.fs.copy(remote.cachePath + '/package.json', 'package.json')
        self.fs.copy(remote.cachePath + '/gulpfile.js', 'gulpfile.js')
      }
      else {
        self.fs.copy(remote.cachePath + '/grunt', './grunt')
      }
      self.fs.copy(remote.cachePath + '/css', './css')
      self.fs.copy(remote.cachePath + '/js', './js')
      self.fs.copy(remote.cachePath + '/img', './img')
      done()
    }, true)
  },

  install: function () {
    if (!this.options['skip-install']) {
      if (this.props.branch == 'beta') {
        this.spawnCommandSync('yarn', ['install'])
        this.spawnCommandSync('gulp')
      }
      else {
        this.spawnCommandSync('npm', ['install'], {cwd:'grunt'})
        this.spawnCommandSync('grunt', ['build'], {cwd:'grunt'})

      }
    }
  }
})
