import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from './components/app';
import NoMatch from './components/common/NoMatch';

import Dashboard from './components/dashboard/Dashboard';
import LatestGames from './components/game/LatestGames';

export default (
    <Route path="/" component={App}>
        <Route component={Dashboard}>
            <IndexRoute component={LatestGames}/>
        </Route>
        <Route path="*" component={NoMatch}/>
    </Route>
);
