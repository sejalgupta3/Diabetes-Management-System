import React, { Component } from 'react';
import Area from '../../charts/area'


class Calories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caloriesBurned: '[]',
      caloriesIntake: '[]',
      caloriesBurnedJson: '{}',
      caloriesIntakeJson: '{}',
      dates: '[]',
      caloriesTableBody: '[]'
    };
    this.serverUrl = "http://35.161.81.114:9000";
  }

  componentWillMount = function() {
    this.getCaloriesBurned();
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

  getCaloriesBurned = function() {
    this.makeGetRequest(this.serverUrl+'/patient/caloriesBurned', function(json){
      console.log(json);
      this.setState({'caloriesBurnedJson':json.caloriesBurned});
      this.getCaloriesIntake();
    }.bind(this));
  }

  getCaloriesIntake = function() {
    this.makeGetRequest(this.serverUrl+'/patient/caloriesIntake', function(json){
      this.setState({'caloriesIntakeJson':json.caloriesIntake});
      console.log(json);
      this.setGraphData();
    }.bind(this));
  }

  custom_sort = function(a, b) {
   return a.getTime() - b.getTime();
  }

  setGraphData = function() {
    var cIntake = this.state.caloriesIntakeJson,
    cBurned = this.state.caloriesBurnedJson,
    caloriesBurnedArr = [],
    caloriesIntakeArr = [],
    datesArr = [],
    dict = {};

    for(var i in cIntake) {
      var date = new Date(cIntake[i].date),
      dateString = (parseInt(date.getMonth())+1) + "-" + date.getDate() + "-" + date.getFullYear(),
      obj = {
        time: date.toTimeString(),
        data: cIntake[i].data
      };

      if (dict[dateString] == undefined) {
        datesArr.push(date);
        dict[dateString] = {
          caloriesIntake: [obj],
          caloriesBurned: []
        };
      } else {
        dict[dateString].caloriesIntake.push(obj);
      }
    }

    for(var i in cBurned) {
      var date = new Date(cBurned[i].date),
      dateString = (parseInt(date.getMonth())+1) + "-" + date.getDate() + "-" + date.getFullYear(),
      obj = {
        time: date.toTimeString(),
        data: cBurned[i].data
      };

      if (dict[dateString] == undefined) {
        datesArr.push(date);
        dict[dateString] = {
          caloriesIntake: [],
          caloriesBurned: [obj]
        };
      } else {
        dict[dateString].caloriesBurned.push(obj);
      }
    }

    var sortedDatesArr = datesArr.sort(this.custom_sort),
    stringArr = [];

    for(var i in sortedDatesArr) {
      var date = sortedDatesArr[i];
      var index = (parseInt(date.getMonth())+1) + "-" + date.getDate() + "-" + date.getFullYear();
      stringArr.push(index);
      var avgCB = 0,
      avgCI = 0,
      cB = dict[index].caloriesBurned,
      cI = dict[index].caloriesIntake;

      for(var i in cB) {
        avgCB = avgCB + parseInt(cB[i].data);
      }

      for(var i in cI) {
        avgCI = avgCI + parseInt(cI[i].data);
      }

      caloriesBurnedArr.push(avgCB);
      caloriesIntakeArr.push(avgCI);

      this.setState({caloriesIntake:caloriesIntakeArr});
      this.setState({caloriesBurned:caloriesBurnedArr});
      this.setState({dates:stringArr});
    }

    var tableRows = [];

    for(var j in stringArr){
      tableRows.push(
        (
        <tr>
          <td>{parseInt(j)+1}</td>
          <td>{stringArr[j]}</td>
          <td>{caloriesIntakeArr[j]}</td>
          <td>{caloriesBurnedArr[j]}</td>
        </tr>
      ));
    }

    var caloriesTableBodyHtml = (
      <tbody>
        {tableRows}
      </tbody>
    );

    this.setState({caloriesTableBody:caloriesTableBodyHtml});
  }

  render() {
    return (
      <div>
        <div className="widget-items">
          <Area caloriesIntake={this.state.caloriesIntake} caloriesBurned={this.state.caloriesBurned} dates={this.state.dates}/>
        </div>
        <div className="widget-items">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Calories Intake</th>
                <th>Calories Burned</th>
              </tr>
            </thead>
            {this.state.caloriesTableBody}
          </table>
        </div>
      </div>
    );
  }
}

export default Calories;
