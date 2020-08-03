import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './app.scss';
import Auth from './auth/auth';
import RegistrationStudent from './auth/components/registration-student/registration-student';
import SignIn from './auth/components/sign-in/sign-in';

export const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route exact path="/auth/login" component={SignIn} />
        <Route path="/student-registration" component={RegistrationStudent} />
      </Switch>
    </div>
  );
};

export default App;
