import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/login/login';
import RegisterPage from './routes/login/register';
import ForgetPage from './routes/login/forget';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/forget" component={ForgetPage} />
      <Route path="/" component={IndexPage} />
    </Router>
  );
}

export default RouterConfig;
