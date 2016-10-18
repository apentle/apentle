/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const chalk = require('chalk');
const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

module.exports = function init(args, config, options) {
  // Install Apentle module
  if (!fs.existsSync(path.resolve(
    process.cwd(),
    'node_modules',
    'react-native-apentle',
    'package.json'
  ))) {
    execSync('npm install --save react-native-apentle');
  }

  // Generate Apentle code
  var name = JSON.parse(fs.readFileSync('package.json', 'utf8')).name;
  var apentle = require(path.resolve(
    process.cwd(),
    'node_modules',
    'react-native-apentle',
    'local-cli',
    'generate-apentle.js'
  ));
  apentle(process.cwd(), name);
};
