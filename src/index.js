import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'

import 'index.css';
import App from 'containers/App';
import registerServiceWorker from 'registerServiceWorker';

import rootReducer from 'store/reducers';
import { initialWorkflowState } from 'store/reducers/index';

const state = {
  workflow: {
    ...initialWorkflowState,
    items: JSON.parse(localStorage.getItem('workflow')) || initialWorkflowState.items
  }
}

const store = createStore(rootReducer, state, applyMiddleware(thunk));

ReactDOM.render((
  <Router>
    <Provider store={store}>
      <App/>
    </Provider>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
