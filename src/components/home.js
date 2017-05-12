import React, { Component } from 'react';

class Landing extends Component {

  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css"/>
          <nav className="landinNav">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo"><i className="material-icons">invert_colors</i></a>
              <ul className="right hide-on-med-and-down">
                <li><a href="/login"><i className="material-icons">input</i></a></li>
              </ul>
            </div>
          </nav>
      <div className="row cloudIntroDiv valign-wrapper">
      	<div className="col s12 center-align">
      		<h1>Healthify</h1>
      		<h4>We help you track your health</h4>
      	</div>
      </div>

      <div className="container aboutUsDiv">
      	<div className="row">
          <div className="col s4">
            <img class="responsive-img" src="/images/patient.png"/>
            <br/>
      			<h5>Healthify aims to provide detailed analysis for diabetes patients</h5>
      		</div>
      		<div className="col s4">
            <img class="responsive-img" src="/images/doctor.png"/>
            <br/>
      			<h5>Healthify aims to help doctors treat patients better</h5>
      		</div>
          <div className="col s4">
              <img class="responsive-img" src="/images/plus.ico"/>
              <br/>
      			<h5>Healthify aims to track diabetes in a better way</h5>
      		</div>
      	</div>
      </div>

      <div className="row valign-wrapper multiDeviceSupportDiv parallex1">
      	<div className="col s12 center-align">
      		<h1>Live Activity Health Data Track in graphical format</h1>
      	</div>
      </div>

      <div className="ios">
      	<div className="row">
      		<h3 className="center-align">Native IOS app for Patients Health Track</h3>
          <br/>
            <div className="col m6 s12 offset-m3">
        		    <img class="responsive-img" src="/images/mobile.png"/>
        		</div>
      	</div>
      </div>

      <div className="row valign-wrapper multiDeviceSupportDiv parallex2">
      	<div className="col s12 center-align">
      		<h1>Calories Intake and Burned tracking</h1>
      	</div>
      </div>

      <div className="container aboutUsDiv">
      	<div className="row">
      		<h2 className="center-align">Responsive Dashboard</h2>
      		<div className="col">
            <img class="responsive-img" src="/images/responsive.png"/>
      		</div>
      	</div>
      </div>

      <div className="row valign-wrapper multiDeviceSupportDiv parallex3">
      	<div className="col s12 center-align">
      		<h1>Glucose Tracking and Prediction with our efficient data models</h1>
      	</div>
      </div>

      <div className="aboutUsDiv">
      	<div className="row">
      		<h1 className="center-align">Our Services</h1>
      		<div className="col m6 s12 offset-m3">
      			<ul>
      				<li>
      					<i className="material-icons medium">done_all</i>
      					Patients can sync up their mobile devices for real time health tracking.
      				</li>
      				<li>
      					<i className="material-icons medium">done_all</i>
      					Doctors can view,or edit existing medications for patients
      				</li>
      				<li>
      					<i className="material-icons medium">done_all</i>
      				      Doctor will recieve alerts as soon as the patient enters the doctor's premises
      				</li>
      				<li>
      					<i className="material-icons medium">done_all</i>
      					Doctors can search all the patients available under his invigilation.
      				</li>
      				<li>
      					<i className="material-icons medium">done_all</i>
      					A Single page application ensures faster rendering of graphs and other relevant data.
      				</li>
      			</ul>
      		</div>
      	</div>
      </div>

      <footer className="page-footer landing-footer">
      	<div className="container">
      		<div className="row">
            		<div className="col l6 s12">
              		<p className="white-text">For any queries do drop us and email and we will get back to you as soon as possible</p>
              		<p className="grey-text text-lighten-4">Email: healthify@healthify.com</p>
            		</div>
            		<div className="col l4 offset-l2 s12">
              		<h5 className="white-text">Links</h5>
      		        <ul>
      		    		<li><a className="grey-text text-lighten-3" href="/login">Login</a></li>
      		        </ul>
            		</div>
          	</div>
        	</div>
        	<div className="footer-copyright">
          	<div className="container">
          		© 2017 Team H1B-Seekers 
          	</div>
      	</div>
      </footer>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
      </div>
    );
  }
}

export default Landing;
