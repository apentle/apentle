/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// eslint-disable-next-line no-unused-vars
const loadModule = require('./loadModule');

/**
 * plugins - load plugins
 *
 * @returns {undefined}
 */
module.exports = function plugins() {
  /**
   * List of plugins will be loaded while running the app.
   *
   * You can add more plugins to this list
   * Plugin name does not include 'apentle-plugin-' prefix
   *
   * For Example:
   * const load_plugins = [
   *  'login',
   *  'wordpress-blog',
   * ];
   *
   * @const {array}
   */
  // eslint-disable-next-line no-unused-vars
  const load_plugins = [
    'example',
  ];
};
