'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var DummiesGenerator = module.exports = function DummiesGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: function () {
        this.spawnCommand('cp', ['js/_bower_components/jquery.scrollTo/jquery.scrollTo.min.js', 'js/components/']);
        this.spawnCommand('cp', ['js/_bower_components/jscrollpane/script/jquery.jscrollpane.min.js', 'js/components/']);
        this.spawnCommand('cp', ['js/_bower_components/jscrollpane/script/jquery.mousewheel.js', 'js/components/']);
        this.spawnCommand('cp', ['js/_bower_components/jscrollpane/script/mwheelIntent.js','js/components/']);
        this.spawnCommand('cp', ['js/_bower_components/modernizr/modernizr.js', 'js/components/']);
        this.spawnCommand('cp', ['js/_bower_components/jquery/jquery.min.js','js/components/']);
        this.spawnCommand('cp', ['js/_bower_components/jquery/jquery.min.map','js/components/']);
        this.spawnCommand('grunt', ['docco:sassFiles']);
        if (this.CoffeeScript) {
          this.spawnCommand('grunt', ['docco:coffeeFiles']);
        }
        else {
          this.spawnCommand('grunt', ['docco:jsFiles']);
        }
      }.bind(this)
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DummiesGenerator, yeoman.generators.Base);

DummiesGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      type: 'confirm',
      name: 'CoffeeScript',
      message: 'Would you like to enable CoffeeScript?',
      default: true
    },
    {
      type: 'list',
      name: 'environment',
      message: 'Where are your putting it?',
      choices: [
        {
          name: 'Scratch',
          value: 'scratch'
        },
        {
          name: 'TYPO3',
          value: 'typo3'
        },
        {
          name: 'Symfony2',
          value: 'symfony2'
        }
      ]
    }
  ];

  this.prompt(prompts, function (props) {
    this.CoffeeScript = props.CoffeeScript;
    this.environment = props.environment;

    cb();
  }.bind(this));
};

DummiesGenerator.prototype.app = function app() {
  this.mkdir('css');
  this.mkdir('css/src');

  this.copy('bower_components/dummy/css/rte.css', 'css/rte.css');
  this.copy('bower_components/dummy/css/src/columns.scss', 'css/src/columns.scss');
  this.copy('bower_components/dummy/css/src/config.scss', 'css/src/config.scss');
  this.copy('bower_components/dummy/css/src/functions.scss', 'css/src/functions.scss');
  this.copy('bower_components/dummy/css/src/ie.scss', 'css/src/ie.scss');
  this.copy('bower_components/dummy/css/src/main.scss', 'css/src/main.scss');
  this.copy('bower_components/dummy/css/src/mediaqueries.scss', 'css/src/mediaqueries.scss');
  this.copy('bower_components/dummy/css/src/mixins.scss', 'css/src/mixins.scss');
  this.copy('bower_components/dummy/css/src/print.scss', 'css/src/print.scss');
  this.copy('bower_components/dummy/css/src/reset.scss', 'css/src/reset.scss');
  this.copy('bower_components/dummy/css/src/styles.scss', 'css/src/styles.scss');

  if (this.environment == "typo3") {
    this.copy('bower_components/dummy/css/src/powermail.scss', 'css/src/powermail.scss');
  }
  this.mkdir('js');
  this.mkdir('js/components');
  this.mkdir('js/htc');

  this.copy('bower_components/dummy/js/htc/backgroundsize.min.htc', 'js/htc/backgroundsize.min.htc');

  if (this.CoffeeScript) {
    this.mkdir('js/src');
    this.copy('bower_components/dummy/js/src/base.coffee', 'js/src/base.coffee');
    this.copy('bower_components/dummy/js/src/main.coffee', 'js/src/main.coffee');
  }
  else {
    this.copy('bower_components/dummy/js/base.js', 'js/base.js');
    this.copy('bower_components/dummy/js/main.js', 'js/main.js');
  }

  this.mkdir('demo');
  this.copy('bower_components/dummy/demo/index.html', 'demo/index.html');

  this.mkdir('docs');
  this.mkdir('docs/assets');
  this.copy('bower_components/dummy/docs/assets/custom.css', 'docs/assets/custom.css');

  this.copy('_bower.json', 'bower.json');
  this.copy('_Gemfile', 'Gemfile');

  this.copy('bower_components/dummy/.bowerrc', '.bowerrc');
  this.copy('bower_components/dummy/LICENSE', 'LICENSE');
  this.copy('bower_components/dummy/README.md', 'README.md');

  this.copy('bower_components/dummy/index.html', 'index.html');

  this.template('_.gitignore', '_.gitignore');
  this.template('_gruntfile.coffee', 'gruntfile.coffee');
  this.template('_package.json', 'package.json');
};

DummiesGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('bower_components/dummy/.editorconfig', '.editorconfig');
};

DummiesGenerator.prototype.rewriteFiles = function rewriteFiles() {
  if (this.environment != "typo3") {
    var styles = this.readFileAsString('css/src/styles.scss');
    styles = styles.replace("\n@import 'powermail';", "");

    var ie = this.readFileAsString('css/src/ie.scss');
    ie = ie.replace("\n@import 'powermail';", "");

    console.log("Powermail include isn't needed for this environment")
    this.write('css/src/styles.scss',styles);
    this.write('css/src/ie.scss',ie);
  }
};
