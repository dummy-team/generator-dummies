# generator-dummies

A light Sass &amp; coffee front-end base in a generator for [Yeoman](http://yeoman.io).


# Usage

- npm install -g generator-dummies
- yo dummies
- run **grunt serve**
- work


# Features

Go check the **[Dummy](https://github.com/in8/dummy)** to get a full list!


- A watch task to compile CoffeeScripts (optional) & Sass
- Autoprefixer for css
- Live reloading
- A task to generate annotated sources fo Sass & CoffeScript files
- [Notifications](https://github.com/dylang/grunt-notify#grunt-notify-) for errors.


# To discuss

## Structure

- lint files / check for code syntax conventions

## Tasks

- Add a task to check git HEAD before running any task. (grunt-git ?)


# Release notes

- **0.2.0** : renamed *generator-dummy* to *generator-dummies* to publish to npm index
- **0.1.0** : *Dummy* is dead, long live *generator-dummy*

# Road map

- **1.0.0**: Remove static dummy files and get them by bower

- split grunt tasks into files
- solve discussions questions and implement them
- Add imagemin to handle optimization
- custom Modernizr build


- **2.0.0**: Write full suite test

- Browserify / CommonJS
- Add tasks to export sources, and push to prod
- Add grunt configuration for symfony2
- Full compatibility (livereloading) with *skinFlex* for *Typo3* (dummy or typo3 issue ?)

# Dependencies

The build and serve tasks use the plugin **grunt-contrib-sass**, it requires you to have **[Ruby](https://www.ruby-lang.org/)**

