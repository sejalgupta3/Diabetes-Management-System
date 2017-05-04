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
import Calories from './calories';
import Glucose from './glucose';
import Medication from './medication';

class PatientDashboard extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container root">
          <div className="side-nav col-md-2">
            <div className="list-group ">
              <NavLink to="/dashboard" className="list-group-item">Home</NavLink>
              <NavLink to="/activities" className="list-group-item">Activities</NavLink>
              <NavLink to="/calories" className="list-group-item">Calories</NavLink>
              <NavLink to="/glucose" className="list-group-item">Glucose</NavLink>
              <NavLink to="/medication" className="list-group-item">Medication</NavLink>
            </div>
          </div>
          <div className="col-md-10 side-content">
            <Switch>
              <Route path="/dashboard" exact component={Home}/>
              <Route path="/activities" component={Activities}/>
              <Route path="/calories" exact component={Calories}/>
              <Route path="/glucose" component={Glucose}/>
              <Route path="/medication" component={Medication}/>
            </Switch>
          </div>
       </div>
     </BrowserRouter>
    );
  }
}

export default PatientDashboard;
