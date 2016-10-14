/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const React = require('react');
const {AppRegistry} = require('react-native');

const {Provider} = require('react-redux');
const configureStore = require('./store/configureStore');

const theme = require('react-native-theme');

module.exports = function() {
  // Bootstrap environment
  require('./bootstrap')();

  // Create root component
  const {App, Loading} = theme;

  class Root extends React.Component {
    componentDidMount() {
      theme.setRoot(this);
    }

    componentWillUnmount() {
      theme.setRoot();
    }

    constructor() {
      super();
      this.state = {
        loading: true,
        store: configureStore(() => this.setState({loading: false})),
      };
    }

    render() {
      if (this.state.loading) {
        return Loading === undefined ? null : <Loading />;
      }
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }

  // Register app component
  AppRegistry.registerComponent('<%= name %>', () => Root);
};
