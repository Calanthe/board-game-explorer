import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from './components/app';
import NoMatch from './components/common/NoMatch';

import Dashboard from './components/dashboard/Dashboard';
import LatestGames from './components/game/LatestGames';
import DetailedGame from './components/game/DetailedGame';

export default (
    <Route path="/" component={App}>
        <Route component={Dashboard}>
            <IndexRoute component={LatestGames}/>
            <Route path="game/:id" component={DetailedGame}/>
        </Route>
        <Route path="*" component={NoMatch}/>
    </Route>
);
