import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';

import App from './App';
import stores from './module/store';

// don't allow state modifications outside actions
configure({ enforceActions: 'always' });

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

const rootStore = {
  ...stores,
  router: routingStore,
  history,
};

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(<App store={rootStore} history={history} />, MOUNT_NODE);
