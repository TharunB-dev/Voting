import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { getCurrentPoll } from '../store/actions';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import PollPage from '../pages/PollPage';
import CreatePollPage from '../pages/CreatePollPage';
import TestPage from '../pages/TestPage';
import VotingInterface from '../components/VotingInterface';
import ResultsPage from '../components/ResultsPage';
import VotingDashboard from '../components/VotingDashboard';
import RulesPage from '../components/RulesPage';
import '../styles/theme.css';

const RouteViews = ({ getCurrentPoll, auth }) => (
  <main>
    <Switch>
      <Route exact path="/" render={props => <HomePage {...props} />} />
      <Route
        exact
        path="/login"
        render={() => (
          <AuthPage authType="login" isAuthenticated={auth.isAuthenticated} />
        )}
      />
      <Route
        exact
        path="/register"
        render={() => (
          <AuthPage
            authType="register"
            isAuthenticated={auth.isAuthenticated}
          />
        )}
      />
      <Route
        exact
        path="/poll/new"
        render={() => <CreatePollPage isAuthenticated={auth.isAuthenticated} />}
      />
      <Route
        exact
        path="/poll/:id"
        render={props => (
          <PollPage getPoll={id => getCurrentPoll(id)} {...props} />
        )}
      />
      <Route
        exact
        path="/vote"
        render={props => <VotingInterface {...props} />}
      />
      <Route
        exact
        path="/tn-vote"
        render={props => <VotingDashboard {...props} />}
      />
      <Route
        exact
        path="/rules"
        render={props => <RulesPage {...props} />}
      />
      <Route
        exact
        path="/results"
        render={props => <ResultsPage {...props} />}
      />
      <Route exact path="/test" render={() => <TestPage />} />
    </Switch>
  </main>
);

export default withRouter(
  connect(
    store => ({
      auth: store.auth,
    }),
    { getCurrentPoll },
  )(RouteViews),
);
