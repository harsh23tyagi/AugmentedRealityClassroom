import React from 'react'
import Main from '../components/layouts/Main';
import Blank from '../components/layouts/Blank';

import MainView from '../views/Main';
import MinorView from '../views/Minor';
import CollaborateView from '../views/Collaborate';
import ARCView from '../views/ARC';

import { Route, Router, IndexRedirect, browserHistory} from 'react-router';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRedirect to="/main" />
            <Route path="main" component={MainView}> </Route>
            <Route path="minor" component={MinorView}> </Route>
            <Route path="collaborate" component={CollaborateView}> </Route>
            
        </Route>
        <Route path="/" component={Blank}>
            <IndexRedirect to="/blank" />
            <Route path="ARC" component={ARCView}> </Route>
        </Route> 
    </Router>

);