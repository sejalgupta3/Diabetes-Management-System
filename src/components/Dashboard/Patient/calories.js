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
  }

  componentWillMount = function() {
    this.getCaloriesBurned();
  }

  makeGetRequest(url, callback) {
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
    this.makeGetRequest('http://localhost:9000/patient/caloriesBurned', function(json){
      this.setState({'caloriesBurnedJson':json.caloriesBurned});
      this.getCaloriesIntake();
    }.bind(this));
  }

  getCaloriesIntake = function() {
    this.makeGetRequest('http://localhost:9000/patient/caloriesIntake', function(json){
      this.setState({'caloriesIntakeJson':json.caloriesIntake});
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
      dateString = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear(),
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
      dateString = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear(),
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
      var index = date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear();
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

    console.log(caloriesTableBodyHtml);
    this.setState({caloriesTableBody:caloriesTableBodyHtml});
  }

  render() {
    return (
      <div className="col-md-10">
        <div className="row widget-items">
          <Area caloriesIntake={this.state.caloriesIntake} caloriesBurned={this.state.caloriesBurned} dates={this.state.dates}/>
        </div>
        <div className="row widget-items">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Calories Intake</th>
                <th>Calories Consumed</th>
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
