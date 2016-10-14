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
const theme = require('react-native-theme');

/**
 * themes - load themes
 *
 * @returns {undefined}
 */
module.exports = function themes() {
  /**
   * List of themes are loaded while running the app.
   *
   * You can add more themes to this list
   * Theme name does not include 'apentle-theme-' prefix
   * First theme in the list is the base theme (default) for the app.
   *
   * For Example:
   * const load_themes = [
   *  'blog',
   *  'wordpress-blog',
   * ];
   *
   * @const {array}
   */
  const load_themes = [
    'example',
  ];

  /**
   * Theme to run app. App will use this theme data!
   *
   * You can change this to your custom theme
   * This name does not include 'apentle-theme-' prefix
   *
   * @const {string}
   */
  const THEME = 'default';

  /*
   * Redefine active function
   * Then active current theme
   */
  var base_theme = load_themes.length > 0 ? load_themes[0] : 'default';
  if (base_theme !== 'default' && theme.originalActive === undefined) {
    theme.originalActive = theme.active;
    theme.active = function(name) {
      theme.originalActive(name === base_theme ? 'default' : name);
    };
  }
  if (THEME !== base_theme && THEME !== 'default') {
    theme.active(THEME);
  }
};
