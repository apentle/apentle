/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const {add} = require('redux-actions-hub');

/**
 * addActions - add actions util
 *
 * @param  {array|object} actions   actions to add
 * @returns {undefined}
 */
function addActions(actions) {
  if (typeof actions === 'string') {
    add(actions);
  } else if (Array.isArray(actions)) {
    actions.forEach(addActions);
  } else if (typeof actions === 'object') {
    for (var type in actions) {
      add(type, actions[type]);
    }
  }
}

module.exports = addActions;
