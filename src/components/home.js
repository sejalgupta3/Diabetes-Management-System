import React, { Component } from 'react';

class Home extends Component {

  render() {
    return (
      <div>
      <div className="row cloudIntroDiv valign-wrapper">
      	<div className="col s12 center-align">
      		<h1>Healthify</h1>
      		<h4>We help you track your health</h4>
      		<a className="btn-large waves-effect waves-light #558b2f light-green darken-1" href="#/login">Know More</a>
      	</div>
      </div>

      <div className="container aboutUsDiv">
      	<div className="row">
      		<h1 className="center-align">We Offer Following Services:</h1>
      		<div className="col m6 s12 offset-m3">
      			<ul>
      				<li>
      					<i className="material-icons medium">done_all</i>
      					User can register, login and view all the sensors information
      				</li>
      				<li>
      					<i className="material-icons medium">done_all</i>
      					We offer latest sensor data for multiple stations
      				</li>
      				<li>
      					<i className="material-icons medium">done_all</i>
      					Data is available in graphical format for better analysis
      				</li>
      				<li>
      					<i className="material-icons medium">done_all</i>
      					Sensors in our system are both managed and controlled well
      				</li>
      				<li>
      					<i className="material-icons medium">done_all</i>
      					View multiple sensor data in extremely less price.
      				</li>
      			</ul>
      		</div>
      	</div>
      </div>

      <div className="row valign-wrapper multiDeviceSupportDiv">
      	<div className="col s12 center-align">
      		<h1>Live Activity Health Data Track in graphical format</h1>
      	</div>
      </div>

      <div className="container featuresDiv center-align">
      	<div className="row">
          	<div className="col s12 m12">
              	<h1>Sensor Information We Offer</h1>
             		<div className="col s12 m4 sensorTypeDiv ">
      		    	<p className="z-depth-2 #f8bbd0 pink lighten-4">Air Temperature</p>
      		  	</div>
      		    <div className="col s12 m4 sensorTypeDiv">
      		      <p className="z-depth-2 #c5cae9 indigo lighten-4">Conductivity</p>
      		    </div>
      		    <div className="col s12 m4 sensorTypeDiv">
      		      <p className="z-depth-2 #a5d6a7 green lighten-3">Currents</p>
      		    </div>
      		    <div className="col s12 m4 sensorTypeDiv">
      		      <p className="z-depth-2 #ffe082 amber lighten-3">Salinity</p>
      		    </div>
      		    <div className="col s12 m4 sensorTypeDiv">
      		      <p className="z-depth-2 #ffebee red lighten-5">Sea Level Pressure</p>
      		    </div>
      		    <div className="col s12 m4 sensorTypeDiv">
      		    	<p className="z-depth-2 #ffecb3 amber lighten-4">Water Level</p>
      		  	</div>
      		    <div className="col s12 m4 sensorTypeDiv">
      		      <p className="z-depth-2 #e6ee9c lime lighten-3">Water Temperature</p>
      		    </div>
      		    <div className="col s12 m4 sensorTypeDiv">
      		      <p className="z-depth-2 #c8e6c9 green lighten-4">Waves</p>
      		    </div>
      		    <div className="col s12 m4 sensorTypeDiv">
      		      <p className="z-depth-2 #b2ebf2 cyan lighten-4">Winds</p>
      		    </div>
      		    <div className="col s12 m4 sensorTypeDiv">
      		      <p className="z-depth-2 #bbdefb blue lighten-4">Sea Level Pressure</p>
      		    </div>
      		</div>
      	</div>
      </div>

      <footer className="page-footer">
      	<div className="container">
      		<div className="row">
            		<div className="col l6 s12">
              		<p className="white-text">For any queries do drop us and email and we will get back to you as soon as possible</p>
              		<p className="grey-text text-lighten-4">Email: abc@cloudSensor.com</p>
            		</div>
            		<div className="col l4 offset-l2 s12">
              		<h5 className="white-text">Links</h5>
      		        <ul>
      		        	<li><a className="grey-text text-lighten-3" href="#">Home</a></li>
      		    		<li><a className="grey-text text-lighten-3" href="#/login">Login</a></li>
      		        	<li><a className="grey-text text-lighten-3" href="#/register">Register</a></li>
      		        </ul>
            		</div>
          	</div>
        	</div>
        	<div className="footer-copyright">
          	<div className="container">
          		2016 Copyright Text
          	</div>
      	</div>
      </footer>
      </div>
    );
  }
}

export default Home;
