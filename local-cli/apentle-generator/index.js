/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const chalk = require('chalk');
const path = require('path');
const extend = require('deep-extend');
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
      this.templatePath('app', '**'),
      this.destinationPath('app'),
      options
    );
  },
  install: function() {
    var tplPath = this.templatePath('package.json');
    var desPath = this.destinationPath('package.json');
    var isNewProject = true;
    if (this.fs.exists(desPath)) {
      try {
        var tplObj = this.fs.readJSON(tplPath);
        var desObj = this.fs.readJSON(desPath);
        // Merge config if needed
        var orgString = JSON.stringify(desObj, null, 2);
        extend(desObj, {
          scripts: tplObj.scripts,
          jest: tplObj.jest,
        });
        var newString = JSON.stringify(desObj, null, 2);
        if (orgString !== newString) {
          // Write to destination package.json
          this.fs.write(desPath, newString + '\n');
        }

        // Install needed modules
        var notInstalled = (function(node_module) {
          return !this.fs.exists(path.resolve(
            process.cwd(),
            'node_modules',
            node_module,
            'package.json'
          ));
        }).bind(this);

        var dependencies = Object.keys(tplObj.dependencies).filter(notInstalled);
        if (dependencies.length > 0) {
          this.npmInstall(dependencies, {'--save': true});
        }

        var devDependencies = Object.keys(tplObj.devDependencies).filter(notInstalled);
        if (devDependencies.length > 0) {
          this.npmInstall(devDependencies, {'--save-dev': true})
        }

        isNewProject = false;
      } catch (e) {
        console.log(chalk.red(e));
      }
    }
    // Build as new project
    if (isNewProject) {
      this.fs.copyTpl(
        tplPath,
        desPath,
        {name: this.name}
      );
      // Install dependencies
      this.installDependencies({npm: true, bower: false});
    }
    // Link all react-native libraries
    this.spawnCommandSync('react-native', ['link']);
  },
  end: function() {
    console.log('');
    this.log(chalk.white.bold('To run your app on iOS:'));
    this.log(chalk.white('   react-native run-ios'));
    console.log('');
    this.log(chalk.white.bold('To run your app on Android:'));
    this.log(chalk.white('   react-native run-android'));
    console.log('');
  },
});
