/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */

module.exports = {
  func: require('./src/apentle'),
  description: 'Generate apentle app project',
  name: 'apentle [action] [file]',
  options: [{
    command: '--type [type]',
    description: 'File type to generate: actions, reducers, ...',
  }],
  examples: [{
    cmd: 'react-native apentle init',
    desc: 'Init apentle app',
  }, {
    cmd: 'react-native apentle generate --type actions user.js',
    desc: 'Generate an action file',
  }],
};
