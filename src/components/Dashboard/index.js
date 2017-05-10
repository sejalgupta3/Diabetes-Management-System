import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import PatientDashboard from './Patient/index';
import DoctorDashboard from './Doctor/index';
import Login from  './Login/LoginCheck';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.getUserSpecificDashboard = this.getUserSpecificDashboard.bind(this);
  }

  getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  /*Function meant to fetch userType from API*/

  getUserType = function() {
    return this.getUrlParameter("user");
  }

  getUserSpecificDashboard = function() {
    if(this.getUserType() == 'patient') {
      return <PatientDashboard/>
    } else {
      return <DoctorDashboard/>
    }
  }

  render() {
    return (
      <div>
        <Header/>
          <this.getUserSpecificDashboard/>
        <Footer/>
      </div>
    );
  }
}

export default Dashboard;
