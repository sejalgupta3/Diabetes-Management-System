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
      predictedGlucose: '[]',
      predictedMedication: '[]',
      patientInfo: '{}'
    };
    this.predictionUrl = "http://ec2-34-208-156-165.us-west-2.compute.amazonaws.com:2000";
    this.serverUrl = "http://35.161.81.114:9000",
    this.predictionMedicalUrl = "http://ec2-34-223-247-43.us-west-2.compute.amazonaws.com:8000",
    this.activityGoal = 4000,
    this.caloriesIntakeGoal = 2000,
    this.caloriesBurnedGoal = 300
  }

  componentWillMount = function(){
    this.getLatestSteps();
    this.getLatestGlucose();
    this.getLatestCaloriesBurned();
    this.getLatestCaloriesIntakeWidget();
    this.getProfileInfo();
    this.getPredictedMedication();
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

 makePostRequest2(url, params, callback) {
    var request = new Request(url, {
      method: 'POST',
      body: JSON.stringify({
        data: params
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
    this.makeGetRequest(this.serverUrl+'/patient/latestActivity', function(json){
      this.setState({'steps':json})
    }.bind(this));
  }

  getLatestGlucose = function() {
    this.makeGetRequest(this.serverUrl+'/patient/latestGlucose', function(json) {
      this.setState({'glucose':{'unit':json.glucose.unit, 'value':json.glucose.data}})
    }.bind(this));
  }

  getLatestCaloriesBurned = function() {
    this.makeGetRequest(this.serverUrl+'/patient/latestCaloriesBurned', function(json){
      this.setState({'caloriesBurned':json.caloriesBurned})
    }.bind(this));
  }

  getLatestCaloriesIntakeWidget = function() {
    this.makeGetRequest(this.serverUrl+'/patient/latestCaloriesIntake', function(json){
      this.setState({'caloriesIntake':json.caloriesIntake})
    }.bind(this));
  }

  getPredictedMedication = function() {
    this.makePostRequest2(this.predictionMedicalUrl, parseInt(this.getUrlParameter("id")) ,function(data){
      this.setState({'predictedMedication':data.value})
    }.bind(this));
  }

  getProfileInfo = function() {
    this.makeGetRequest(this.serverUrl+'/patient/patientInfo', function(data){
      this.setState({'patientInfo':data.patientInfo})
      this.makePostRequest(this.predictionUrl, parseFloat(data.patientInfo.bmi) ,function(data){
        this.setState({'predictedGlucose':data.value[0]})
      }.bind(this));
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
              heading="BODY MASS INDEX"
              value={this.state.patientInfo.bmi}
              units={this.state.patientInfo.bmiUnit}
              image = {
                <img className="img-responsive" src="/images/bmi.png"></img>
              }
            />
          </div>
          <div className="col-md-4">
            <this.widget
              heading="HEIGHT"
              value={this.state.patientInfo.height}
              units={this.state.patientInfo.heightUnit}
              image = {
                <img className="img-responsive" src="/images/height.png"></img>
              }
            />
          </div>
          <div className="col-md-4">
            <this.widget
              heading="WEIGHT"
              value={this.state.patientInfo.weight}
              units={this.state.patientInfo.weightUnit}
              image = {
                <img className="img-responsive" src="/images/weight.png"></img>
              }
            />
          </div>
          <div className="col-md-4">
            <this.widget
              heading="GLUCOSE PREDICTIONS"
              value={this.state.predictedGlucose}
              image = {
                <img className="img-responsive" src="/images/glucosep.png"></img>
              }
            />
          </div>
          <div className="col-md-4">
            <this.widget
              heading="MEDICATION PREDICTIONS"
              value={this.state.predictedMedication}
              image = {
                <img className="img-responsive" src="/images/medical.png"></img>
              }
            />
          </div>
          <div className="col-md-6">
            <this.widget
              heading = "ACTIVITY GOAL TRACK"
              value = {this.state.steps.StepCount}
              units = "Steps"
              graph = {
                <SolidGuage
                  text = 'steps'
                  data= {[this.state.steps.StepCount]}
                  units = 'steps'
                  goal = {this.activityGoal}
                />
              }
            />
          </div>
          <div className="col-md-6">
            <this.widget
              heading="CALORIES BURNED GOAL TRACK"
              value={this.state.caloriesBurned.data}
              units={this.state.caloriesBurned.unit}
              graph = {
                <SolidGuage
                  text = 'calories to burn'
                  data = {[this.state.caloriesBurned.data]}
                  units = 'kcal'
                  goal = {this.caloriesBurnedGoal}
                />
              }
            />
          </div>
          <div className="col-md-6">
            <this.widget
              heading="CALORIES INTAKE GOAL TRACK"
              value={this.state.caloriesIntake.data}
              units={this.state.caloriesIntake.unit}
              graph = {
                <SolidGuage
                  text =  'calories to intake'
                  data = {[this.state.caloriesIntake.data]}
                  units = 'kcal'
                  goal = {this.caloriesIntakeGoal}
                />
              }
            />
          </div>
      </div>
    );
  }
}

export default Home;
