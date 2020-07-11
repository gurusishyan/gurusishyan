import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './app.scss';
import Auth from './auth/auth';
import RegistrationStudent from './auth/components/registration-student/registration-student';

export const App = () => {
  return (
    <Route>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/student-registration" component={RegistrationStudent} />
      </Switch>
    </Route>
  );
};

export default App;
