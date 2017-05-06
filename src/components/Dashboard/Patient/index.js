import React, { Component } from 'react';
import {
  BrowserRouter,
  HashRouter,
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
      <HashRouter>
        <div className="container root">
          <div className="side-nav col-md-2">
            <div className="list-group ">
              <NavLink to="home" className="list-group-item"><span className="glyphicon glyphicon-home"></span>Home</NavLink>
              <NavLink to="activities" className="list-group-item"><span className="glyphicon glyphicon-dashboard"></span>Activities</NavLink>
              <NavLink to="calories" className="list-group-item"><span className="glyphicon glyphicon-fire"></span>Calories</NavLink>
              <NavLink to="glucose" className="list-group-item"><span className="glyphicon glyphicon-heart-empty"></span>Glucose</NavLink>
              <NavLink to="medication" className="list-group-item"><span className="glyphicon glyphicon-erase"></span>Medication</NavLink>
            </div>
          </div>
          <div className="col-md-10 side-content">
            <Switch>
              <Route path="/home" component={Home}/>
              <Route path="/activities" component={Activities}/>
              <Route path="/calories" component={Calories}/>
              <Route path="/glucose" component={Glucose}/>
              <Route path="/medication" component={Medication}/>
            </Switch>
          </div>
       </div>
     </HashRouter>
    );
  }
}

export default PatientDashboard;
