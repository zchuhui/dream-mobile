import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/login/login';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={LoginPage} />
      <Route path="/home" component={IndexPage} />
    </Router>
  );
}

export default RouterConfig;
