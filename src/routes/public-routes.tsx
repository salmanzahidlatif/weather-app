import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from 'src/pages';

const PublicRoutes = () => (<Fragment>
  <Switch>
    <Route path='/' exact>
      <Dashboard/>
    </Route>
  </Switch>
</Fragment>);

export default PublicRoutes;
