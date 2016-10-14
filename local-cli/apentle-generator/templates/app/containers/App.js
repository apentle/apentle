/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const React = require('react');
const {Text, View} = require('react-native');

if (__DEV__) { // hot reload dependencies
  require('../styles');
  require('../i18n');
}

var App = React.createClass({
  render: function() {
    return (
      <View class="container">
        <Text class="welcome">
          {__('welcome')}
        </Text>
        <Text class="instructions">
          {__('get_started')}
        </Text>
      </View>
    );
  },
});

module.exports = App;
