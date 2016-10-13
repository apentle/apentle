/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const chalk = require('chalk');

const local = {
  init: {
    func: require('./init'),
    description: 'Init apentle app',
  },
  generate: {
    func: require('./generate'),
    command: 'generate [options] [file]',
    description: 'Generate a file in apentle system',
  },
};

function printHelperUsage() {
  console.log(chalk.red('  No valid action found!'));
  console.log([
    '',
    chalk.bold('  Usage:'),
    '',
    chalk.green('  react-native apentle [options] [action] [file]'),
    ''
  ].join('\n'));

  // Action Usage
  console.log([
    '',
    chalk.bold('  Actions:'),
    '',
  ].join('\n'));
  var length = 0;
  console.log(Object.keys(local).map(name => {
    var action = local[name];
    var command = action.command === undefined ? name : action.command;
    var description = action.description;
    length = Math.max(length, command.length);
    return {command, description};
  }).map(cmd => {
    var space = (new Array(length + 4 - cmd.command.length)).join(' ');
    return '    ' + cmd.command + space + cmd.description;
  }).join('\n'));

  // Options
  console.log([
    '',
    chalk.bold('  Options:'),
    '',
  ].join('\n'));
  length = 0;
  console.log(require('../index').options.map(option => {
    length = Math.max(length, option.command.length);
    return option;
  }).map(cmd => {
    var space = (new Array(length + 4 - cmd.command.length)).join(' ');
    return '    ' + cmd.command + space + cmd.description;
  }).join('\n'));

  console.log('\n');
}

module.exports = function apentle(args, config, options) {
  var action = args[0];
  if (action === undefined || local[action] === undefined) {
    printHelperUsage();
  } else {
    // Run action
    local[action].func(args.slice(1), config, options);
  }
};
