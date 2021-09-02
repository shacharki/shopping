import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PageHome from './components/PageHome';
import SignUp from './components/SignUp';




function LoadPage() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={PageHome} />
                    <Route exact path="/SignUp" component={SignUp} />





                </Switch>
            </Router>
        </div>
    );
}

export default LoadPage;


{ <Route exact path='/home' exact component={PageHome} /> }
// {<Route exact path="/login/:id" component={Home} />}