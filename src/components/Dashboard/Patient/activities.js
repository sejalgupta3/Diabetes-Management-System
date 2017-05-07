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
    this.serverUrl = "http://localhost:9000";
  }

  componentWillMount = function() {
    this.getActivities();
  }

  getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  getActivities = function() {
    this.makeGetRequest(this.serverUrl+'/patient/activities', function(json){
      var c = [];
      var d = [];
      var tableRows = [];
      for( var dateIndex in json.activity) {
        var date = new Date(json.activity[dateIndex].Date);
        c.push((parseInt(date.getMonth())+1)+'-'+date.getDate()+'-'+date.getFullYear());
        d.push(json.activity[dateIndex].StepCount);
        tableRows.push(
          (
          <tr>
            <td>{parseInt(dateIndex)+1}</td>
            <td>{(parseInt(date.getMonth())+1)+'-'+date.getDate()+'-' + date.getFullYear()}</td>
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

  activityGraph = function() {
    return (
      <Column data={this.state.data} categories={this.state.categories}/>
    );
  }

  render() {
    return (
      <div>
        <div className="widget-items">
          <this.activityGraph/>
        </div>
        <div className="widget-items">
          <table className="table table-striped table-bordered">
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
