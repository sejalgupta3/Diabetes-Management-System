import React, { Component } from 'react';
import {
  BrowserRouter,
  Router,
  Link,
  IndexRoute,
  Switch,
  NavLink,
  Route
} from 'react-router-dom';
import Home from './home';
import Activities from './activities';

class PatientDashboard extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="row">
          <div className="side-nav col-md-2">
            <div className="list-group ">
              <NavLink to="/dashboard/home" className="list-group-item" activeClassName="active">Home</NavLink>
              <NavLink to="/dashboard/activities" className="list-group-item" activeClassName="active">Activities</NavLink>
            </div>
          </div>
          <Switch>
            <Route path="/dashboard/home" exact component={Home}/>
            <Route path="/dashboard/activities" component={Activities}/>
          </Switch>
       </div>
     </BrowserRouter>
    );
  }
}

export default PatientDashboard;
