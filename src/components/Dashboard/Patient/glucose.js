import React, { Component } from 'react';
import Line from '../../charts/line'

class Glucose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glucoseJson: '{}',
      dataArr: '[]',
      datesArr: '[]',
      glucoseTableBodyHtml: '[]'
    };
    this.serverUrl = "http://localhost:9000";
  }

  componentWillMount = function() {
    this.getGlucose();
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

  ConvertNumberToTwoDigitString = function(n) {
      return n > 9 ? "" + n : "0" + n;
  }

  custom_sort = function(a, b) {
   return a.getTime() - b.getTime();
  }

  getGlucose = function() {
    this.makeGetRequest(this.serverUrl+'/patient/glucose', function(json){
      var datesArr = [],
      dataArr = [],
      avg, tableRows = [], time,
      dict = {},
      glucoseArr = [];

      for(var i in json.glucose) {
        var data = json.glucose[i];
        var date = new Date(data["date"]),
        dateString = (parseInt(date.getMonth())+1) + "-" + date.getDate() + "-" + date.getFullYear(),
        obj = {
          time: date.toTimeString(),
          data: data.data
        };

        if (dict[dateString] == undefined) {
          datesArr.push(date);
          dict[dateString] = {
            glucose: [obj],
          };
        } else {
          dict[dateString].glucose.push(obj);
        }
      }

      var sortedDatesArr = datesArr.sort(this.custom_sort),
      stringArr = [],
      dataHtmlArr = [];

      for(var i in sortedDatesArr) {
        var date = sortedDatesArr[i];
        var index = (parseInt(date.getMonth())+1) + "-" + date.getDate() + "-" + date.getFullYear(),
        pArray = [];
        stringArr.push(index);
        var avgG = 0,
        g = dict[index].glucose;

        for(var i in g) {
          avgG = avgG + parseInt(g[i].data);
          pArray.push(
            (
              <p>{g[i].time}: {g[i].data}</p>
            )
          );
        }

        glucoseArr.push(avgG);
        dataHtmlArr.push(pArray);
      }

      this.setState({dataArr:glucoseArr});
      this.setState({datesArr:stringArr});

      var tableRows = [];
      for(var j in stringArr){
        tableRows.push(
          (
          <tr>
            <td>{parseInt(j)+1}</td>
            <td>{stringArr[j]}</td>
            <td>{dataHtmlArr[j]}</td>
          </tr>
        ));
      }

      var glucoseTableBodyHtml = (
        <tbody>
          {tableRows}
        </tbody>
      );

      this.setState({glucoseTableBodyHtml:glucoseTableBodyHtml});
    }.bind(this));
  }

  render() {
    return (
      <div>
        <div className="widget-items">
          <Line data={this.state.dataArr} categories={this.state.datesArr}/>
        </div>
        <div className="widget-items">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Glucose</th>
              </tr>
            </thead>
            {this.state.glucoseTableBodyHtml}
          </table>
        </div>
      </div>
    );
  }
}

export default Glucose;
