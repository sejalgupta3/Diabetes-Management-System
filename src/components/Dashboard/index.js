import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import PatientDashboard from './Patient/index';
import DoctorDashboard from './Doctor/index';
import Login from  './Login/LoginCheck';

class Dashboard extends Component {
  constructor(props) {
    super(props);

  this.getUserType = this.getUserType.bind(this);
  this.getUserSpecificDashboard = this.getUserSpecificDashboard.bind(this);
  }

  /*Function meant to fetch userType from API*/
  getUserType = function(){
    return 'doctor';
  }

  
  getUserSpecificDashboard = function() {
    if(this.getUserType() == 'patient'){
      return <PatientDashboard/>
    }else{
      return <DoctorDashboard/>
    }
  }
  

  render() {
    return (
      <div>
        <Header/>
          <div className="container">
            <this.getUserSpecificDashboard/>
          </div>
        <Footer/>
      </div>
    );
  }
}

export default Dashboard;
