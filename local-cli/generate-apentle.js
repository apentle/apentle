/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yeoman = require('yeoman-environment');

module.exports = function generate(dir, name) {
  const oldCwd = process.cwd();

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  process.chdir(dir);

  const env = yeoman.createEnv();
  env.register(path.join(__dirname, 'apentle-generator'), 'react:apentle');
  const args = ['react:apentle', name];

  env.run(args, {}, function () {
    process.chdir(oldCwd);
  });
};
