import React, { Component } from 'react';
import WorkflowView from './WorkflowView';
import { Route, Link } from 'react-router-dom';

export default class AdminView extends Component {

  render() {
    const { match } = this.props;
    return (
      <div className="AdminView">
        <Route path={`${match.url}/workflow`} component={WorkflowView} />
        <Route exact path={match.url} render={() => (
          <Link to={`${match.url}/workflow`}>Workflow</Link>
        )} />
      </div>
    );
  }
}
