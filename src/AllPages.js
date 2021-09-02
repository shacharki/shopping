import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PageHome from './components/PageHome';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Products from './components/Products';
import UserPage from './components/UserPage';




function LoadPage() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={PageHome} />
                    <Route exact path="/SignUp" component={SignUp} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/Products/:id" component={Products} />
                    <Route exact path="/User" component={UserPage} />





                </Switch>
            </Router>
        </div>
    );
}

export default LoadPage;


{ <Route exact path='/home' exact component={PageHome} /> }
// {<Route exact path="/login/:id" component={Home} />}