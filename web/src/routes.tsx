import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import CreateOrphanage from './pages/CreateOrphanage';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Landing} path="/" exact />
        <Route component={OrphanagesMap} path="/app" />

        <Route component={CreateOrphanage} path="/orphanage/create" />
        <Route component={OrphanageDetails} path="/orphanage/:id" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
