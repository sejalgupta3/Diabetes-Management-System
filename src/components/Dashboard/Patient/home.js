import React, { Component } from 'react';
import SolidGuage from '../../charts/solidGuage'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: '[]',
      glucose: '{}',
      caloriesBurned: '{}',
      caloriesIntake: '{}',
      predictedGlucose: '[]'    };
  }

  componentWillMount = function(){
    this.getLatestSteps();
    this.getLatestGlucose();
    this.getLatestCaloriesBurned();
    this.getLatestCaloriesIntakeWidget();
    //this.getPredictedGlucose();
  }

  getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  makeGetRequest(url, callback) {
    url = url + '?patientId=' + this.getUrlParameter("id");
    var request = new Request(url, {
    	method: 'GET',
    	mode: 'cors',
    	redirect: 'follow',
    	headers: new Headers({
    		'Content-Type': 'application/json'
    	})
    });

    fetch(request).then(function(response) {
      return response.json();
    }).then(function(j) {
      callback(j);
    });
  }

  makePostRequest(url, params, callback) {
     var request = new Request(url, {
       method: 'POST',
       body: JSON.stringify({
         bmi: params
       }),
       mode: 'cors',
       redirect: 'follow'
     });

     fetch(request).then(function(response) {
       return response.json();
     }).then(function(j) {
       callback(j);
     });
 }

  getLatestSteps = function() {
    this.makeGetRequest('http://localhost:9000/patient/latestActivity', function(json){
      this.setState({'steps':json})
    }.bind(this));
  }

  getLatestGlucose = function() {
    this.makeGetRequest('http://localhost:9000/patient/latestGlucose', function(json){
      this.setState({'glucose':{'unit':json.glucose.unit, 'value':json.glucose.data[0].value}})
    }.bind(this));
  }

  getLatestCaloriesBurned = function() {
    this.makeGetRequest('http://localhost:9000/patient/latestCaloriesBurned', function(json){
      this.setState({'caloriesBurned':json.caloriesBurned})
    }.bind(this));
  }

  getLatestCaloriesIntakeWidget = function() {
    this.makeGetRequest('http://localhost:9000/patient/latestCaloriesIntake', function(json){
      this.setState({'caloriesIntake':json.caloriesIntake})
    }.bind(this));
  }

  getPredictedGlucose = function() {
    this.makePostRequest('http://10.250.4.104:8000', 19.6 ,function(data){
      this.setState({'predictedGlucose':data.value[0]})
    }.bind(this));
  }

  widget = function (props) {
    return (
      <div className="widget panel panel-info">
        <div className="panel-heading">{props.heading}</div>
          <div className="panel-body center">
            <h2 className="h1">{props.value}<span className="txt-small"> {props.units}</span></h2>
            {props.graph}
            {props.image}
          </div>
      </div>
    );
  }

  render() {
    return (
      <div className="widget-items">
          <div className="col-md-4">
            <this.widget
              heading="GLUCOSE"
              value={this.state.glucose.value}
              units={this.state.glucose.unit}
              image = {
                <img className="img-responsive" src="/images/glucose.png"></img>
              }
            />
          </div>
          <div className="col-md-4">
            <this.widget
              heading="Body Mass Index"
              value={200}
              units={this.state.caloriesIntake.units}
              image = {
                <img className="img-responsive" src="/images/BMI.png"></img>
              }
            />
          </div>
          <div className="col-md-4">
            <this.widget
              heading="BLOOD PRESSURE"
              value="30"
              units={this.state.caloriesIntake.units}
              image = {
                <img className="img-responsive" src="/images/bp.png"></img>
              }
            />
          </div>
          <div className="col-md-4">
            <this.widget
              heading = "ACTIVITY"
              value = {this.state.steps.StepCount}
              units = "Steps"
              graph = {
                <SolidGuage
                  text = 'Steps'
                  data= {[6000/8000*100]}
                  units = 'steps'
                  goal = '8000'
                />
              }
            />
          </div>
          <div className="col-md-4">
            <this.widget
              heading="CALORIES BURNED"
              value={this.state.caloriesBurned.data}
              units={this.state.caloriesBurned.unit}
              graph = {
                <SolidGuage
                  text = 'Calories'
                  data = {[300/1000*100]}
                  units = 'kcal'
                  goal = '1000'
                />
              }
            />
          </div>
          <div className="col-md-4">
            <this.widget
              heading="CALORIES INTAKE"
              value={this.state.caloriesIntake.data}
              units={this.state.caloriesIntake.unit}
              graph = {
                <SolidGuage
                  text = 'Calories'
                  data = {[100/3000*100]}
                  units = 'kcal'
                  goal = '3000'
                />
              }
            />
          </div>
      </div>
    );
  }
}

export default Home;
