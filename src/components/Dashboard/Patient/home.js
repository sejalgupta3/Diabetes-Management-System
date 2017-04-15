import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: '[]',
      glucose: '[]',
      caloriesBurned: '[]',
      caloriesIntake: '[]'
    };

    this.activityWidget = this.activityWidget.bind(this);
    this.glucoseWidget = this.glucoseWidget.bind(this);
    this.caloriesBurnedWidget = this.caloriesBurnedWidget.bind(this);
    this.caloriesIntakeWidget = this.caloriesIntakeWidget.bind(this);
  }

  componentWillMount = function(){
    this.getLatestSteps();
    this.getLatestGlucose();
    this.getLatestCaloriesBurned();
    this.getLatestCaloriesIntakeWidget();
  }

  makeGetRequest(url, callback){
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

  getLatestSteps = function() {
    this.makeGetRequest('http://localhost:9000/patient/latestActivity', function(json){
      this.setState({'steps':json})
    }.bind(this));
  }

  getLatestGlucose = function() {
    this.makeGetRequest('http://localhost:9000/patient/latestGlucose', function(json){
      this.setState({'glucose':json})
    }.bind(this));
  }

  getLatestCaloriesBurned = function() {
    this.makeGetRequest('http://localhost:9000/patient/latestCaloriesBurned', function(json){
      this.setState({'caloriesBurned':json})
    }.bind(this));
  }

  getLatestCaloriesIntakeWidget = function() {
    this.makeGetRequest('http://localhost:9000/patient/latestCaloriesIntake', function(json){
      this.setState({'caloriesIntake':json})
    }.bind(this));
  }

  activityWidget = function () {
    return (
      <div className="widget">
          <div className="panel-body center">
            <h2 className="h1"> {this.state.steps.steps} <span className="txt-small">Steps</span></h2>
          </div>
      </div>
    );
  }

  glucoseWidget = function () {
    return (
      <div className="widget">
          <div className="panel-body center">
            <h2 className="h1"> {this.state.glucose.value} <span className="txt-small">{this.state.glucose.units}</span></h2>
          </div>
      </div>
    );
  }

  caloriesBurnedWidget = function () {
    return (
      <div className="widget">
          <div className="panel-body center">
            <h2 className="h1"> {this.state.caloriesBurned.calories} <span className="txt-small">{this.state.caloriesBurned.units}</span></h2>
          </div>
      </div>
    );
  }

  caloriesIntakeWidget = function () {
    return (
      <div className="widget">
          <div className="panel-body center">
            <h2 className="h1"> {this.state.caloriesIntake.calories} <span className="txt-small">{this.state.caloriesIntake.units}</span></h2>
          </div>
      </div>
    );
  }

  render() {
    return (
      <div className="col-md-10">
          <div className="row widget-items">
              <div className="col-md-4">
                <this.activityWidget/>
              </div>
              <div className="col-md-4">
                <this.glucoseWidget/>
              </div>
              <div className="col-md-4">
                <this.caloriesBurnedWidget/>
              </div>
              <div className="col-md-4">
                <this.caloriesIntakeWidget/>
              </div>
          </div>
      </div>
    );
  }
}

export default Home;
