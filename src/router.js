import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import DetailPage from './routes/home/detail';
import LoginPage from './routes/login/login';
import RegisterPage from './routes/login/register';
import ForgetPage from './routes/login/forget';
import FlyPage from './routes/fly/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/forget" component={ForgetPage} />
      <Route path="/" component={IndexPage} />
      <Route path="/fly" component={FlyPage} />
      <Route path="/home/detail" component={DetailPage} />
    </Router>
  );
}

export default RouterConfig;
