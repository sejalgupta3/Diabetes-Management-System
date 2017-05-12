import React, { Component } from 'react';
import Column from '../../charts/column';
import Pagination from 'react-js-pagination';

class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: '[]',
      categories: '[]',
      data: '[]',
      activityTableBody: '',
      activePage: 1,
      totalItemsCount: 0
    };

    this.activityGraph = this.activityGraph.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.serverUrl = "http://35.161.81.114:9000";
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
      this.setState({'activities':json.activity});
      var c = [];
      var d = [];
      var tableRows = [];
      this.setState({'totalItemsCount':json.activity.length});
      this.handlePageChange(1);
      for( var dateIndex in json.activity) {
        var date = new Date(json.activity[dateIndex].Date);
        c.push((parseInt(date.getMonth())+1)+'-'+date.getDate()+'-'+date.getFullYear());
        d.push(json.activity[dateIndex].StepCount);
      }
      this.setState({'categories':c});
      this.setState({'data':d})
    }.bind(this));
  }

  displayTable = function(start, end) {
    var tableRows = [],
    data =  this.state.activities;
    for(var i=start; i<end;i++) {
      var date = new Date(data[i].Date);
      tableRows.push(
        (
        <tr>
          <td>{parseInt(i)+1}</td>
          <td>{(parseInt(date.getMonth())+1)+'-'+date.getDate()+'-' + date.getFullYear()}</td>
          <td>{data[i].WalkingRunningDistance}</td>
          <td>{data[i].StepCount}</td>
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

  handlePageChange(pageNumber) {
    var start = 10*(pageNumber-1),
    end = start + 10;
    if(this.state.totalItemsCount < end) {
      end = this.state.totalItemsCount;
    }
    this.displayTable(start, end);
    this.setState({activePage: pageNumber});
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
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.totalItemsCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Activities;
