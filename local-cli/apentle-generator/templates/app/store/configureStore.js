/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const {applyMiddleware, createStore} = require('redux');

import thunk from 'redux-thunk'; // es-module
const createLogger = require('redux-logger');

const reducers = require('redux-reducers-hub');

/**
 * configureStore - create redux-store
 *
 * @param  {function} onComplete callback after init store
 * @returns {object}             redux-store
 */
function configureStore(onComplete) {
  // Apply middlewares
  var middlewares = [thunk];
  events.emit('middlewaresWillApply', middlewares);
  if (__DEV__ && !!window.navigator.userAgent) {
    middlewares.push(createLogger({
      collapsed: true,
      duration: true,
    }));
  }

  // Create store
  var storeCreator = applyMiddleware.apply(null, middlewares)(createStore);
  var result = {}; // {store: <created store>}
  events.emit('storeWillCreate', storeCreator, reducers, onComplete, result);

  if (result.store === undefined) {
    result.store = storeCreator(reducers);
    setTimeout(onComplete, 0);
  }

  global.reduxStore = result.store;
  return reduxStore;
}

module.exports = configureStore;
