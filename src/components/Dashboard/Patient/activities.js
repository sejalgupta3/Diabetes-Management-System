import React, { Component } from 'react';
import Column from '../../charts/column';

class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: '[]',
      categories: '[]',
      data: '[]',
      activityTableBody: ''
    };
    this.activityGraph = this.activityGraph.bind(this);
  }

  componentWillMount = function() {
    this.getActivities();
  }

  getActivities = function() {
    this.makeGetRequest('http://localhost:9000/patient/activities', function(json){
      var c = [];
      var d = [];
      var tableRows = [];
      for( var dateIndex in json.activity) {
        var date = new Date(json.activity[dateIndex].Date);
        c.push(date.getMonth()+'-'+date.getDate()+'-'+date.getFullYear());
        d.push(json.activity[dateIndex].StepCount);
        tableRows.push(
          (
          <tr>
            <td>{parseInt(dateIndex)+1}</td>
            <td>{date.getMonth()+'-'+date.getDate()+'-' + date.getFullYear()}</td>
            <td>{json.activity[dateIndex].WalkingRunningDistance}</td>
            <td>{json.activity[dateIndex].StepCount}</td>
          </tr>
        )
        );
      }
      var activityHtml = (
        <tbody>
          {tableRows}
        </tbody>
      );
      this.setState({'activityTableBody':activityHtml});
      this.setState({'activities':json.activity});
      this.setState({'categories':c});
      this.setState({'data':d})
    }.bind(this));
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

  activityGraph = function() {
    return (
      <Column data={this.state.data} categories={this.state.categories}/>
    );
  }

  render() {
    return (
      <div className="col-md-10">
        <div className="row widget-items">
          <this.activityGraph/>
        </div>
        <div className="row widget-items">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Miles Covered</th>
                <th>Total Steps</th>
              </tr>
            </thead>
              {this.state.activityTableBody}
          </table>
        </div>
      </div>
    );
  }
}

export default Activities;
