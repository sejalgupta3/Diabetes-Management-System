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
import patientMedications from './patientMedications';
import Schedule from './Schedule';
import PatientDemographics from './PatientDemographics';
const io = require('socket.io-client')

class Doctor extends Component {
	componentWillMount = function(){
		var socket = io.connect('http://35.161.81.114:9000');
		socket.on('chat message', function(data){
			if (confirm("Patient " + data.name  + " is here.. View PatientDetails?")) {
				window.location = '/dashboard/patientDetails/' + data.name ;
			}
		})
	      };

	render() {
    return (
    		 <BrowserRouter>
    	        <div className="row">
    	          <div className="side-nav col-md-1">
    	            <div className="list-group ">
    	              <NavLink to="/dashboard/searchPatient" className="list-group-item" activeClassName="active"><img src="https://www.vnahg.org/sites/default/files/who-should-have-a-visiting-physican-hover.svg" width="40px" height="40px"></img></NavLink>
    	            </div>
    	          </div>
    	          <Switch>
    	            <Route path="/dashboard/searchPatient" exact component={searchPatient}/>
    	            <Route path="/dashboard/Schedule" component={Schedule}/>
    	            <Route path="/dashboard/patientMedications/:id"  component={patientMedications}/>
    	            <Route path="/dashboard/patientDetails/:name"  component={PatientDemographics}/>
    	          </Switch>
    	       </div>
    	     </BrowserRouter>
    );
  }
}

export default Doctor;
//Neha
