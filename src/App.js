
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer, Provider } from 'mobx-react';
import Layout from '@component/Layout';


@observer
class App extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider {...store}>
        <Router history={history}>
          <Switch>
            <Route path="/" component={Layout} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
};

export default App;
