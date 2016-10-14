/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },
  configuring: function() {
    var files = ['babelrc', 'env', 'eslintrc'];
    for (var i = 0; i < files.length; i++) {
      this.fs.copy(
        this.templatePath('_' + files[i]),
        this.destinationPath('.' + files[i]),
      );
    }
  },
  writing: function() {
    var options = {name: this.name};
    // index files
    var files = ['index.android.js', 'index.ios.js'];
    for (var i = 0; i < files.length; i++) {
      this.fs.copyTpl(
        this.templatePath(files[i]),
        this.destinationPath(files[i]),
        options
      );
    }
    // app files
    this.fs.copyTpl(
      this.templatePath(path.join('app', '**')),
      this.destinationPath('app'),
      options
    );
  },
  install: function() {
    console.log('install react-native and packages (package.json)');
  },
});
