# generator-dummies

It scaffold a **[Dummy](https://github.com/Dummy-team/dummy)** with [Yeoman](http://yeoman.io).

# Usage

```
npm install -g generator-dummies`
yo dummies
```

# Features

Go check the **[Dummy](https://github.com/Dummy-team/dummy)** to get a full list!


# To discuss

## Structure

- lint files / check for code syntax conventions

## Tasks

- Add a task to check git HEAD before running any task. (grunt-git ?)


# Road map

- split grunt tasks into files
- solve discussions questions and implement them
- Add imagemin to handle optimization
- custom Modernizr build


- **2.0.0**: Write full suite test

- Browserify / CommonJS
- Add tasks to export sources, and push to prod
- Add grunt configuration for symfony2
- Full compatibility (livereloading) with *skinFlex* for *Typo3* (clean the cache entry in database)

# Dependencies

The build and serve tasks use the plugin **grunt-contrib-sass**, it requires you to have **[Ruby](https://www.ruby-lang.org/)**
