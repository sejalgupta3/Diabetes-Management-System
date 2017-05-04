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
  }

  componentWillMount = function() {
    this.getGlucose();
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

  ConvertNumberToTwoDigitString = function(n) {
      return n > 9 ? "" + n : "0" + n;
  }

  getGlucose = function() {
    this.makeGetRequest('http://localhost:9000/patient/glucose', function(json){
      var datesArr = [],
      dataArr = [],
      avg, tableRows = [], time;

      for(var index in json.glucose) {
        avg = 0;
        var data = json.glucose[index],
        date = new Date(data.date),
        pArray = [];

        datesArr.push(date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear());
        for(var j in data.data) {
          avg = avg + parseInt(data.data[j].value);
          time = this.ConvertNumberToTwoDigitString(date.getUTCHours()) +
           ":" + this.ConvertNumberToTwoDigitString(date.getUTCMinutes());
          pArray.push(
            (
              <p>{time}: {data.data[j].value}</p>
            )
          );
        }
        tableRows.push(
          (
          <tr>
            <td>{parseInt(index)+1}</td>
            <td>{date.getMonth()+'-'+date.getDate()+'-'+date.getFullYear()}</td>
            <td>{pArray}</td>
          </tr>
        ));
        dataArr.push(avg);
      }

      var glucoseTableBodyHtml = (
        <tbody>
          {tableRows}
        </tbody>
      );

      this.setState({'glucoseJson':json.glucose});
      this.setState({'dataArr':dataArr});
      this.setState({'datesArr':datesArr});
      this.setState({'glucoseTableBodyHtml':glucoseTableBodyHtml});
    }.bind(this));
  }

  getGlucoseTable = function() {
    var tableRows = [],
    json = this.state.dataArr;
    console.log("jsonn"+json);
  }

  render() {
    return (
      <div>
        <div className="row widget-items">
          <Line data={this.state.dataArr} categories={this.state.datesArr}/>
        </div>
        <div className="row widget-items">
          <table className="table table-striped">
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
