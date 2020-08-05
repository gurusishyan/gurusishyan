import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { Spinner } from '../shared/components';

const LoginForm = lazy(() => import('./components/LoginForm/LoginForm'));
const RegistrationStudent = lazy(() =>
  import('./components/registration-student/registration-student')
);

export const Auth = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/student-registration">
              <RegistrationStudent />
            </Route>
            <Route path="/" exact>
              <LoginForm />
            </Route>
            <Redirect to={'/'} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default Auth;
