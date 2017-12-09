import React, { Component } from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';

import AdminView from './AdminView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/admin" component={AdminView}/>
        <Route exact path="/" render={() => <Redirect to="/admin"/>}/>
      </div>
    );
  }
}

export default App;
