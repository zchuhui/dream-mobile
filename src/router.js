import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import DetailPage from './routes/home/detail';
import LoginPage from './routes/login/login';
import RegisterPage from './routes/login/register';
import ForgetPage from './routes/login/forget';
import FlyPage from './routes/fly/index';
import UserinfoPage from './routes/my/userinfo';
import OtherPage from './routes/my/userinfoOther';
import EditPage from './routes/my/edit';
import SetupPage from './routes/my/setup/setup';
import AboutPage from './routes/my/about';
import SearchPage from './routes/search/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/forget" component={ForgetPage} />
        <Route path="/" component={IndexPage} />
        <Route path="/fly" component={FlyPage} />
        <Route path="/home/detail" component={DetailPage} />
        <Route path="/my/userinfo" component={UserinfoPage} />
        <Route path="/my/other" component={OtherPage} />
        <Route path="/my/edit" component={EditPage} />
        <Route path="/my/setup" component={SetupPage} />
        <Route path="/my/about" component={AboutPage} />
        <Route path="/search" component={SearchPage} />
      </div>
    </Router>
  );
}

export default RouterConfig;
