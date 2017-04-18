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
import searchPatient from './searchPatient';
import Schedule from './Schedule';
import PatientDemographics from './PatientDemographics';


class Doctor extends Component {
  render() {
    return (
    		 <BrowserRouter>
    	        <div className="row">
    	          <div className="side-nav col-md-2">
    	            <div className="list-group ">
    	              <NavLink to="/dashboard/searchPatient" className="list-group-item" activeClassName="active">Search Patient</NavLink>
    	              <NavLink to="/dashboard/Schedule" className="list-group-item" activeClassName="active">See my Schedule</NavLink>
    	              </div>
    	          </div>
    	          <Switch>
    	            <Route path="/dashboard/searchPatient" exact component={searchPatient}/>
    	            <Route path="/dashboard/Schedule" component={Schedule}/>
    	            <Route path="/dashboard/patientDetails/:name"  component={PatientDemographics}/>
    	            
    	          </Switch>
    	       </div>
    	     </BrowserRouter>
     
    );
  }
}

export default Doctor;
//Neha