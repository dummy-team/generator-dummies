'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var dummysay = require('dummysay')
var marked = require('marked')
var TerminalRenderer = require('marked-terminal')
marked.setOptions({renderer: new TerminalRenderer()})

var instructions = '\n\n\n'
var branch = 'master'

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async()

    // Have the dummy greet the user.
    this.log(dummysay(
      'Welcome to the ' + chalk.blue('dummy') + ' factory!'
    ))

    var prompts = [{
      type: 'checkbox',
      name: 'component',
      message: 'What component do you want?',
      choices: ['bootstrap_grid', 'cookie-box'],
      default: ['bootstrap_grid']
    }
  ]

    this.prompt(prompts, function (props) {
      this.props = props

      done()
    }.bind(this))

    return
  },

  writing: function () {
    this.props.component.forEach( (component) => {
      this.remote('dummy-team', 'dummy-toolkit', branch, (err, remote) => {
        if (err) {
          return this.log(err)
        }
        const path = remote.cachePath + '/components/' + component

        this.fs.copy( path + '/css/**/*.scss', './css/')

        this.fs.copy( path + '/js/**/*.js', './js/')

        instructions += marked(this.fs.read(path + '/readme.md')) + '\n'
      })
    })

    return
  },

  end: function () {
    if (!this.options['quiet']) {
      instructions += ''
      instructions += marked('# Components:')
      var list = ''

      this.props.component.forEach( (component) => {
        list += '- [' + component + '](https://github.com/dummy-team/dummy-toolkit/tree/' + branch + '/components/' + component + ') \n'
      })

      instructions += marked(list) + '\n'

      instructions += marked('**Scroll up for detailed instructions ⤴**')

      this.log(instructions)
    }

    return
  }
})
