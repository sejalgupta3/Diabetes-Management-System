import React, { Component } from 'react';
import Line from '../../charts/line'

class Glucose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glucoseJson: '{}',
      dataArr: '[]',
      datesArr: '[]'
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

  getGlucose = function() {
    this.makeGetRequest('http://localhost:9000/patient/glucose', function(json){
      var datesArr = [],
      dataArr = [],
      avg;

      for(var index in json.glucose) {
        avg = 0;
        var data = json.glucose[index];
        datesArr.push(j=data.date);
        for(var j in data.data) {
          avg = avg + parseInt(data.data[j].value);
        }
        dataArr.push(avg);
      }

      this.setState({'glucoseJson':json.glucose});
      this.setState({'dataArr':dataArr});
      this.setState({'datesArr':datesArr});
    }.bind(this));
  }

  render() {
    return (
      <div className="col-md-10">
        <div className="row widget-items">
          <Line data={this.state.dataArr} categories={this.state.datesArr}/>
        </div>
      </div>
    );
  }
}

export default Glucose;
