/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const theme = require('react-native-theme');
const addLayout = require('react-native-theme/layout');
const addTranslation = require('./i18n');
const addActions = require('./addActions');

/**
 * loadModule - load module (theme or plugin) for app
 *
 * @param  {object} data            module's configuration
 * @param  {string|undefined} name  theme's name (if module is theme)
 * @returns {undefined}
 */
function loadModule(data, name) {
  if (typeof data !== 'object') {
    return;
  }
  // Run before load module
  if (typeof data.willLoad === 'function') {
    data.willLoad();
  }

  // CSS Style
  if (Array.isArray(data.styles)) {
    data.styles.forEach(function(styles) {
      theme.add(styles, name);
    });
  } else if (typeof data.styles === 'object') {
    theme.add(data.styles, name);
  }
  // Components
  if (data.components !== undefined) {
    theme.addComponents(data.components, name);
  }
  // Layouts
  if (data.layouts !== undefined) {
    addLayout(data.layouts);
  }
  // I18n
  if (data.i18n !== undefined) {
    addTranslation(data.i18n);
  }
  // Redux actions
  if (data.actions !== undefined) {
    addActions(data.actions);
  }
  // Redux reducers
  if (typeof data.reducers === 'function') {
    data.reducers();
  }

  // Run after load module
  if (typeof data.loaded === 'function') {
    data.loaded();
  }
}

module.exports = loadModule;
